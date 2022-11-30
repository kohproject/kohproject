from tkinter import CASCADE
from django.db import models
from django.utils import timezone
# from django.contrib.auth.models import User
import datetime

# Create your models here.

class PassUser(models.Model):
    passwd = models.CharField(max_length=40)
    def __str__(self):
        return self.passwd

class Nation(models.Model):
    country = models.CharField(max_length=100)
    def __str__(self):
        return self.country
    
class Ethnic(models.Model):
    country = models.CharField(max_length=100)
    def __str__(self):
        return self.country

class Profession(models.Model):
    profession = models.CharField(max_length=255)

    def __str__(self):
        return self.profession

class Gender(models.Model):
    gender = models.BinaryField()

    def __str__(self):
        return self.gender

# class SocialTwitter():
#     socialtwitter = models.CharField(max_length=255)
#     def __str__(self):
#         return self.socialtwitter

# class SocialFacebook():
#     socialfacebook = models.CharField(max_length=255)
#     def __str__(self):
#         return self.socialfacebook

# class SocialInstagram():
#     socialinstagram = models.CharField(max_length=255)
#     def __str__(self):
#         return self.socialinstagram

# class Social(models.Model):
#     socfacebook = models.ForeignKey(SocialFacebook, on_delete=models.CASCADE)
#     socinstagram = models.ForeignKey(SocialInstagram, on_delete=models.CASCADE)
#     soctwitter = models.ForeignKey(SocialTwitter, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.socfacebook

class kohPassword(models.Model):
    url = models.CharField(max_length=255, primary_key=True)
    passwd = models.ForeignKey(PassUser, on_delete=models.CASCADE)
    def __str__(self): 
        return self.url

class kohPerson(models.Model):
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    nation = models.ForeignKey(Nation, on_delete=models.CASCADE)
    ethnic = models.ForeignKey(Ethnic, on_delete=models.CASCADE)
    profession = models.ForeignKey(Profession, on_delete=models.CASCADE)
   # passwd = models.ForeignKey(PassUser, on_delete=models.CASCADE)

    fbook = models.CharField(max_length=255, editable = False, null = True)
    twitt = models.CharField(max_length=255, editable = False, null = True)
    insta = models.CharField(max_length=255, editable = False, null = True)
    notes = models.CharField(max_length=255, editable = False, null = True)

    class Gender(models.IntegerChoices):
        Male = 1
        Female = 2
        Other = 3
    gender = models.IntegerField(choices=Gender.choices, default=1)

    # class Meta:
    #     abstract = True
    def __str__(self): 
        return self.name

