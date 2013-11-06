# -*- coding:GBK -*- 
import httplib, urllib, json
class Portal:
    def __init__(self,tokenURL, username, password):
            self.tokenURL=tokenURL
            self.username=username
            self.password=password              
    def gettoken(self):
        params = urllib.urlencode({'username': self.username, 'password': self.password, 'client': 'requestip', 'f': 'json'})  
        result=self.resthttp(params)
        print result
    def resthttp(self,params):
        headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}    
        # Connect to URL and post parameters
        httpConn = httplib.HTTPSConnection("gisportal.arcgisonline.cn")
        httpConn.request("POST", self.tokenURL, params, headers)   
        response = httpConn.getresponse()
        if (response.status != 200):
            httpConn.close()
            print "Error while fetching tokens from admin URL. Please check the URL and try again."
            return 
        else:
            data = response.read()
            httpConn.close()                
            if not self.assertJsonSuccess(data):            
                return        
            t = json.loads(data)               
            return t
        
    def assertJsonSuccess(self,data):
        obj = json.loads(data)
        if 'status' in obj and obj['status'] == "error":
            print "Error: JSON object returns an error. " + str(obj)
            return False
        else:
            return True

p=Portal('/sharing/generateToken', 'esri001', '1');
p.gettoken();


