from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

# Test case 1: Login thành công
driver.get("http://localhost:5000/login")  # link form login Lab 04
driver.find_element(By.NAME, "username").send_keys("admin")
driver.find_element(By.NAME, "password").send_keys("123456")
driver.find_element(By.ID, "loginBtn").click()
time.sleep(2)
assert "Welcome" in driver.page_source

# Test case 2: Sai password
driver.get("http://localhost:5000/login")
driver.find_element(By.NAME, "username").send_keys("admin")
driver.find_element(By.NAME, "password").send_keys("wrong")
driver.find_element(By.ID, "loginBtn").click()
time.sleep(2)
assert "Invalid" in driver.page_source

# Test case 3: Empty input
driver.get("http://localhost:5000/login")
driver.find_element(By.ID, "loginBtn").click()
time.sleep(2)
assert "Please enter username" in driver.page_source

driver.quit()
