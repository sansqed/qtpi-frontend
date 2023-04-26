import unittest
from WebDriver import WebDriver
from time import sleep
import json

class Test_Auth(unittest.TestCase):
    def test_ValidLogin(self):
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/")


        wb.pressLogoutBtn()
        sleep(5)
        wb.enterSignInCredsValid()
        wb.pressSignInBtn()

        sleep(1)
        isSuccess = wb.verifySignInSuccess()
        self.assertTrue(isSuccess)
    
    def test_InvalidLogin(self):
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/")

        wb.pressLogoutBtn()
        
        sleep(5)
        wb.enterSignInCredsInvalid()
        wb.pressSignInBtn()

        sleep(1)
        isSuccess = wb.verifySignInFailed()
        self.assertTrue(isSuccess)
        
    def test_Logout(self):
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/")

        wb.pressLogoutBtn()

        sleep(0.5)
        isSuccess = wb.verifyLogoutSuccess()
        self.assertTrue(isSuccess)
        
        
    

class test_UsersModule(unittest.TestCase):
    def test_AddUser(self):
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/users/add")
        
        wb.enterAddUserDetails()
        wb.pressSubmitBtn()
        
        sleep(1)
        isSuccess = wb.verifyCreateUserSuccess()
        self.assertTrue(isSuccess)
        
    def test_EditUser(self):
        f = open("tests/Data.json")
        data = json.load(f)
        f.close()
        
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/users/edit/userid="+data["editUserId"])
        
        wb.enterEditUserDetails()
        wb.pressSubmitBtn()
        
        sleep(0.5)
        isSuccess = wb.verifyEditSuccess()
        self.assertTrue(isSuccess)
    
    def test_DeleteUser(self):
        f = open("tests/Data.json")
        data = json.load(f)
        f.close()
        
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/users/userid="+data["deleteUserId"])
        
        wb.pressDeleteBtn()
        
        sleep(1)
        isSuccess = wb.verifyDeleteSuccess()
        self.assertTrue(isSuccess)

if __name__ == '__main__':
    unittest.main()