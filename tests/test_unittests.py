import unittest
from WebDriver import WebDriver
from time import sleep
import json

class Test_Auth(unittest.TestCase):
    def test_ValidLogin(self):
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/")


        # wb.pressLogoutBtn()
        # sleep(5)
        wb.enterSignInCredsValid()
        wb.pressSignInBtn()

        sleep(1)
        isSuccess = wb.verifySignInSuccess()
        self.assertTrue(isSuccess)
    
    def test_InvalidLogin(self):
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/")

        # wb.pressLogoutBtn()
        
        # sleep(5)
        wb.enterSignInCredsInvalid()
        wb.pressSignInBtn()

        sleep(1)
        isSuccess = wb.verifySignInFailed()
        self.assertTrue(isSuccess)
        
    def test_Logout(self):
        wb = WebDriver()
        wb.driver.get("http://localhost:3000/")
        wb.enterSignInCredsValid()
        wb.pressSignInBtn()

        sleep(5)
        wb.pressLogoutBtn()

        sleep(0.5)
        isSuccess = wb.verifyLogoutSuccess()
        self.assertTrue(isSuccess)
        
        
    

class test_UsersModule(unittest.TestCase):
    def test_1AddUser(self):
        wb = WebDriver()
        
        wb.driver.get("http://localhost:3000/users/add")
        wb.enterSignInCredsValid()
        wb.pressSignInBtn()

        sleep(3)
        wb.enterAddUserDetails()
        wb.pressSubmitBtn()
        
        sleep(1)
        isSuccess = wb.verifyCreateUserSuccess()
        self.assertTrue(isSuccess)
        
    def test_2EditUser(self):
        # f = open("Data.json")
        # data = json.load(f)
        # f.close()
        
        wb = WebDriver()
        
        latestUserID = wb.getLatestUser()
        wb.driver.get("http://localhost:3000/users/edit/userid="+latestUserID)
        # wb.enterSignInCredsValid()
        # wb.pressSignInBtn()

        sleep(3)
        wb.enterEditUserDetails()
        wb.pressSubmitBtn()
        
        sleep(0.5)
        isSuccess = wb.verifyEditSuccess()
        self.assertTrue(isSuccess)
    
    def test_3DeleteUser(self):
        # f = open("Data.json")
        # data = json.load(f)
        # f.close()
        
        
        
        wb = WebDriver()
        latestUserID = wb.getLatestUser()
        wb.driver.get("http://localhost:3000/users/userid="+latestUserID)
        # wb.enterSignInCredsValid()
        # wb.pressSignInBtn()

        sleep(3)
        wb.pressDeleteBtn()
        
        sleep(1)
        isSuccess = wb.verifyDeleteSuccess()
        self.assertTrue(isSuccess)

class test_EmployeesModule(unittest.TestCase):
    def test_AddEmployee(self):
        wb = WebDriver()
        
        wb.driver.get("http://localhost:3000/employees/add")
        wb.enterSignInCredsValid()
        wb.pressSignInBtn()

        sleep(3)
        wb.enterAddEmployeeDetails()
        wb.pressSubmitBtn()
        
        sleep(1)
        isSuccess = wb.verifyCreateEmployeeSuccess()
        self.assertTrue(isSuccess)
        
    # def test_EditEmployee(self):
    #     f = open("Data.json")
    #     data = json.load(f)
    #     f.close()
        
    #     wb = WebDriver()
    #     wb.driver.get("http://localhost:3000/employees/edit/employeeid="+data["editEmployeeId"])
    #     wb.enterSignInCredsValid()
    #     wb.pressSignInBtn()

    #     sleep(3)
    #     wb.enterEditEmployeeDetails()
    #     wb.pressSubmitBtn()
        
    #     sleep(0.5)
    #     isSuccess = wb.verifyEditSuccess()
    #     self.assertTrue(isSuccess)
    
    def test_DeleteEmployee(self):
        
        wb = WebDriver()
        
        employeeId = wb.getLatestEmployee()
        
        wb.driver.get("http://localhost:3000/employees/employeeid="+employeeId)
        # wb.enterSignInCredsValid()
        # wb.pressSignInBtn()

        sleep(3)
        wb.pressDeleteBtn()
        
        sleep(1)
        isSuccess = wb.verifyEmployeeDeleteSuccess()
        self.assertTrue(isSuccess)


if __name__ == '__main__':
    unittest.main()