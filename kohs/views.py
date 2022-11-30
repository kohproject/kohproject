from operator import truediv
from django.http import HttpResponse,JsonResponse
from django.shortcuts import render,redirect
from django.core import serializers
import json

from .models import kohPerson,Nation,Ethnic,Gender,Profession,kohPassword
# Create your views here.

kohs = kohPerson.objects.order_by('?')
#kohs = kohPerson.objects.all()
nations = Nation.objects.all()
ethnics = Ethnic.objects.all()
professions = Profession.objects.all()
passds = kohPassword.objects.all()

# social = Social.objects.all()

class kohObj:
    def __init__(self,obj):
        self.nation = 'Singapore'
        self.ethnic = 'chinese'
        self.profession = 'photographer'     
        fields= json.loads(obj)[0]
        self.url = fields['pk']
        fields = fields['fields']
        self.name = fields['name']
        self.created = fields['created_at']
        self.modified = fields['modified_at']
        self.gender = fields['gender']

         # covert number to nation/live
        if fields['nation'] ==1:
            self.nation = 'Korea'
        elif fields['nation'] ==2:
            self.nation = 'China'
        elif fields['nation'] ==3:
            self.nation = 'USA'
        elif fields['nation'] ==4:
            self.nation ='Singapore'
        elif fields['nation'] ==5:
            self.nation = 'HongKong/China'
        elif fields['nation'] ==6:
            self.nation = 'Australia'
        elif fields['nation'] ==7:
            self.nation = 'Canada'
        elif fields['nation'] ==8:
            self.nation = 'Great Britain'
        elif fields['nation'] ==9:
            self.nation = 'Canada'
        elif fields['nation'] ==10:
            self.nation = 'Japan'
        elif fields['nation'] ==11:
            self.nation = 'HongKong/China'

        # covert number to ethnicity
        if fields['ethnic'] ==1:
            self.ethnic = 'chinese'
        elif fields['ethnic'] ==2:
            self.ethnic = 'korean'
        elif fields['ethnic'] ==3:
            self.ethnic = 'euro'
        elif fields['ethnic'] ==4:
            self.ethnic = 'multi-ethnic'
        elif fields['ethnic'] ==5:
            self.ethnic = 'malay'
        elif fields['ethnic'] ==6:
            self.ethnic = 'singapore/chinese'
        elif fields['ethnic'] ==7:
            self.ethnic = 'indonesian/chinese'
        elif fields['ethnic'] ==8:
            self.ethnic = 'taiwanese/chinese'
        elif fields['ethnic'] ==9:
            self.ethnic = 'malay/chinese'

         # covert number to profession
        if fields['profession'] ==1:
            self.profession = 'Artist'
        elif fields['profession'] ==2:
            self.profession = 'Engineer'
        elif fields['profession'] ==3:
            self.profession = 'Designer'
        elif fields['profession'] ==4:
            self.profession = 'Software'
        elif fields['profession'] ==5:
            self.profession = 'Teacher'
        elif fields['profession'] ==6:
            self.profession = 'Professor'
        elif fields['profession'] ==7:
            self.profession = 'Photographer'
        elif fields['profession'] ==8:
            self.profession = 'Blogger'
        elif fields['profession'] ==9:
            self.profession = 'Consultant'
        elif fields['profession'] ==10:
            self.profession = 'Writer'
        elif fields['profession'] ==11:
            self.profession = 'Poet'
        elif fields['profession'] ==12:
            self.profession = 'Public Speaker'
        elif fields['profession'] ==13:
            self.profession = 'Musician'
        elif fields['profession'] ==14:
            self.profession = 'Journalist'
        elif fields['profession'] ==15:
            self.profession = 'Physician'
        elif fields['profession'] ==16:
            self.profession = 'Creative Director'
        elif fields['profession'] ==17:
            self.profession = 'Research/Academics'
        elif fields['profession'] ==18:
            self.profession = 'Makeup Artist'
        elif fields['profession'] ==19:
            self.profession = 'Film Maker'
        elif fields['profession'] ==20:
            self.profession = 'Copywriter'
        elif fields['profession'] ==21:
            self.profession = 'Financial Advisor'
        elif fields['profession'] ==22:
            self.profession = 'Venture Capitalist'
            
def replaceChar(str,char):
    return str.replace(char,'')

def buildMyObj(_set):
    myObj = kohObj(serializers.serialize("json",_set))

    obj ={}
    obj['name'] = myObj.name.lower()
    obj['ethnic'] = myObj.ethnic.lower()
    obj['nation'] = myObj.nation.lower()
    obj['profession'] = myObj.profession.lower()
    obj['url'] = myObj.url
    obj['modified'] = myObj.modified
    obj['created'] = myObj.created

    if(myObj.gender == 1):
        obj['gender'] ='male'
    elif(myObj.gender == 2):
        obj['gender'] ='female'
    else:
        obj['gender'] ='other'
  
    return obj

def stripDomain(str):
    str_http  = replaceChar(str,'https://www.')
    str_http = replaceChar(str_http,'http://www.')
    str_http = replaceChar(str_http,'.com')
    str_http = replaceChar(str_http,'/')

    return str_http

def apikoh(request,k):
    if(k == 'all'):
        myList =[]
        for kh in kohs:
            kohurl = str(kh.pk)
            kohurl = stripDomain(kohurl)
            kohurl1 = 'https://www.'+str(kohurl.strip())+'.com'
            kohurl2 = 'http://www.'+str(kohurl.strip())+'.com'
            qset = kohPerson.objects.filter(pk=kohurl1) | kohPerson.objects.filter(pk=kohurl2) 
            myObj = buildMyObj(qset)
           
            myList.append(myObj)
            #print(myList);

    return HttpResponse(json.dumps(myList))
        
def about(request,type):
    context ={
        "title1":"About",
        "title2":"Contact",
        "variation":type
    }
    return render(request,'about.html', context)

def loginkoh(request):
    if request.method=='POST':
        cdata = json.loads(request.body)
        obj = checkCredentials(cdata)
        #context ={"data":obj['kobj']}
        if(obj['isBool']):
            request.session['koh'] = obj['kobj']
            return redirect('/')
            #print(request.session['koh'])
            # return JsonResponse({"data":request.session['koh']},False)
        else:
            request.session['koh'] = None

    return redirect('/')

def index(request):
    context ={
        "title":"TheKohProject",
        "kohs":kohs,
        "ethnics":ethnics,
        "nations":nations,
        "professions":professions
    }
    #return render(request,'index.html', context)
   
    if(request.method != "POST"):
        return render(request,'index.html', context)
    else:
        # print(request.session['koh'])
      
        context={"data":request.session['koh'],"nations":nations,"ethnics":ethnics, "professions":professions}
        # print(context)
        return render(request,'kohEdit.html', context)

def define_gender(num):
    gender = "male"
    if(num == 2):
        gender = "female"
    elif(num != 1 and num !=2):
        gender = "other"
    return gender

def personkoh(request):
    qset = kohPerson.objects.filter(pk='http://www.sonnykoh.com')
    person = buildMyObj(qset)
    domain = stripDomain(str(person['url']))
    gender = define_gender(person['gender'])
    
    context ={
        "person":person,
        "nations":nations,
        "ethnics":ethnics,
        "domain":domain,
        "gender":gender
    }

    # context.ethnics = ethnics
    return render(request,'person.html', context)

def checkCredentials(obj):
    bool = False
    url = replaceChar(obj['user'],'https://')
    url = str(replaceChar(url,'http://'))
    passwd =str(obj['pass'])
    kohObj = None
    
    for pitm in kohPassword.objects.all():
        if(str(pitm.url) == url):
            bool = (str(pitm.passwd) == passwd)
            break

    if(bool):
        kohurl1 = str('https://'+url)
        kohurl2 = str('http://'+url)
        qs = kohPerson.objects.all().filter(url=kohurl1) | kohPerson.objects.all().filter(url=kohurl2)
        kohObj = buildMyObj(qs)
    
    return {"isBool":bool, "kobj":kohObj}    

def kohedit(request):
    return render(request,'kohEdit.html')

def updatekoh(request):
     if request.method=='POST':
        cdata = json.loads(request.body)
        qs = kohPerson.objects.all().filter(url=cdata['url'])
        qs.notes = cdata['notes']
        print(qs.notes)
        #qs.save()

        return render(request,'index.html')



