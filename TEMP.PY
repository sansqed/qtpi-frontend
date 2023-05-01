from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import json
# import requests

class WebDriver():

    def __init__(self):
        # INITIALIZE SELENIUM WEBDRIVER
        options = webdriver.ChromeOptions()
        options.add_argument('--disable-notifications')
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.driver = webdriver.Chrome()
        
        # f = open("Data.json")
        # f = open("tests/Data.json")
        # self.data = json.load(f)
        # f.close()
        
    def enterFormByName(self, HTMLname, toInput):
        form = self.driver.find_element(By.NAME, HTMLname)
        form.send_keys(toInput)
        
    def enterSignInCredsValid(self):
        
        self.enterFormByName("username", "qtpi-admin")
        self.enterFormByName("password","123456") 
    
    def pressSignInBtn(self):
        btn = self.driver.find_element(By.CLASS_NAME, 'btn-sign-in')
        btn.click()
    
    def findLatestEmployeeId(self):
        list1 = self.driver.find_elements(By.CLASS_NAME, 'employee-list-link')
        
        list1[-1].get_attribute("href")[-2:]
        
        with open(DATAURL) as x:
            data = json.load(x)
            
        data['deleteEmployeeId'] = list1[-1].get_attribute("href")[-2:]
        
        with open(DATAURL, "w") as x:
            json.dump(data, x)
        
            
wb = WebDriver()
wb.driver.get("http://localhost:3000/employees")
wb.enterSignInCredsValid()
wb.pressSignInBtn()
sleep(5)

wb.test()
sleep(3)