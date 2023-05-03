from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
# import requests

import json

class WebDriver():

    def __init__(self):
        # INITIALIZE SELENIUM WEBDRIVER
        options = webdriver.ChromeOptions()
        options.add_argument('--disable-notifications')
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.driver = webdriver.Chrome()
        
        # f = open("Data.json")
        f = open("tests/Data.json")
        self.data = json.load(f)
        f.close()
    
    # WRITE ON FORMS 
    def enterFormByName(self, HTMLname, toInput):
        form = self.driver.find_element(By.NAME, HTMLname)
        form.send_keys(toInput)
    
    def enterSignInCredsValid(self):
        for key, value in self.data["validSignInCreds"].items():
            self.enterFormByName(key, value) 

    def enterSignInCredsInvalid(self):
        for key, value in self.data["invalidSignInCreds"].items():
            self.enterFormByName(key, value)     
        
    def enterAddUserDetails(self):
        for key, value in self.data["addUserDetails"].items():
            self.enterFormByName(key, value)
            
    def enterEditUserDetails(self):
        for key, value in self.data["editUserDetails"].items():
            self.enterFormByName(key, value)

    def enterAddEmployeeDetails(self):
        for key, value in self.data["addEmployeeDetails"].items():
            self.enterFormByName(key, value)

    # PRESS BUTTONS
    def pressSignInBtn(self):
        btn = self.driver.find_element(By.CLASS_NAME, 'btn-sign-in')
        btn.click()

    def pressLogoutBtn(self):
        btn = self.driver.find_element(By.CLASS_NAME, "btn-logout")
        btn.click()
        
    def pressSubmitBtn(self):
        btn = self.driver.find_element(By.CLASS_NAME, "btn-submit")
        btn.click()
        
    def pressDeleteBtn(self):
        btn = self.driver.find_element(By.CLASS_NAME, "btn-delete")
        btn.click()

    # VERIFY
    def verifySignInSuccess(self):
        try:
            toaster = self.driver.find_element(By.CLASS_NAME, "toaster-container")
            return toaster.text == "Login Sucess!"
        except:
            return False
        
    def verifySignInFailed(self):
        try:
            toaster = self.driver.find_element(By.CLASS_NAME, "toaster-container")
            return toaster.text == "Login Failed."
        except:
            return False

    def verifyCreateUserSuccess(self):
        try:
            toaster = self.driver.find_element(By.CLASS_NAME, "toaster-container")
            return toaster.text == "User Created Successfully"
        except:
            return False
        
    def verifyCreateEmployeeSuccess(self):
        try:
            toaster = self.driver.find_element(By.CLASS_NAME, "toaster-container")
            return toaster.text == "Employee Created Successfully"
        except:
            return False

    def verifyDeleteSuccess(self):
        try:
            toaster = self.driver.find_element(By.CLASS_NAME, "toaster-container")  
            return toaster.text == "User Deleted Successfully"
        except:
            return False
        
    def verifyEmployeeDeleteSuccess(self):
        try:
            toaster = self.driver.find_element(By.CLASS_NAME, "toaster-container")  
            return toaster.text == "Employee Deleted Successfully"
        except:
            return False
        
    def verifyEditSuccess(self):
        try:
            toaster = self.driver.find_element(By.CLASS_NAME, "toaster-container")
            return toaster.text == "Update success"
        except:
            return False
    def verifyLogoutSuccess(self):
        try:
            toaster = self.driver.find_element(By.CLASS_NAME, "toaster-container")
            return toaster.text == "Logged out"
        except:
            return False
    
    # GET VALUES
    
    def getLatestEmployee(self):
        self.driver.get("http://localhost:3000/employees")
        self.enterSignInCredsValid()
        self.pressSignInBtn()
        sleep(3)
        
        empployeeList = self.driver.find_elements(By.CLASS_NAME, 'employee-list-link')
        returnValue = empployeeList[-1].get_attribute("href")[-2:]
        # print(returnValue)
        sleep(3)
        
        return returnValue
    
    def getLatestUser(self):
        self.driver.get("http://localhost:3000/users")
        self.enterSignInCredsValid()
        self.pressSignInBtn()
        sleep(3)
        
        empployeeList = self.driver.find_elements(By.CLASS_NAME, 'user-list-link')
        returnValue = empployeeList[-1].get_attribute("href")[-2:]
        # print(returnValue)
        sleep(3)
        
        return returnValue
    def preventClose(self):
        while 1:
            pass


    