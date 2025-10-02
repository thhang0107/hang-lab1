const mysql = require('mysql2/promise');
const crypto = require('crypto');

async function getConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'atm_demo'
  });
}

async function verifyPin(card_no, pin) {
  const conn = await getConnection();
  const [rows] = await conn.execute("SELECT pin_hash FROM cards WHERE card_no=?", [card_no]);
  await conn.end();

  if (rows.length === 0) return false;
  const hash = crypto.createHash('sha256').update(pin).digest('hex');
  return rows[0].pin_hash === hash;
}

async function withdraw(card_no, amount) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    // Lấy số dư
    const [rows] = await conn.execute(`
      SELECT a.account_id, a.balance 
      FROM accounts a 
      JOIN cards c ON a.account_id=c.account_id 
      WHERE c.card_no=? FOR UPDATE
    `, [card_no]);

    if (rows.length === 0) throw new Error("Card not found");
    const { account_id, balance } = rows[0];

    if (balance < amount) throw new Error("Insufficient funds");

    // Update balance
    await conn.execute("UPDATE accounts SET balance=balance-? WHERE account_id=?", [amount, account_id]);

    // Log transaction
    await conn.execute(`
      INSERT INTO transactions(account_id, card_no, atm_id, tx_type, amount, balance_after)
      VALUES(?, ?, 1, 'WITHDRAW', ?, ?)
    `, [account_id, card_no, amount, balance - amount]);

    await conn.commit();
    console.log("Withdraw success. New balance:", balance - amount);

  } catch (err) {
    await conn.rollback();
    console.error("Error:", err.message);
  } finally {
    await conn.end();
  }
}

// --- Test ---
(async () => {
  const card_no = "1111222233334444";
  const pin = "1234";

  if (await verifyPin(card_no, pin)) {
    await withdraw(card_no, 200);
  } else {
    console.log("Invalid PIN");
  }
})();
