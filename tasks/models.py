from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta

class Checklist(models.Model):
	title = models.CharField(max_length=200)
	description = models.CharField(max_length=200)

	def __str__(self):
		return self.title

class Task(models.Model):
	title = models.CharField(max_length=200)
	duration = models.DurationField('due date', default=timedelta(days=1))
	checklist = models.ForeignKey(Checklist)
	description = models.CharField(max_length=200)
	done = models.BooleanField(default=False)
	depends = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)

	def __str__(self):
		return self.title

class Member(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	checklists = models.ManyToManyField(Checklist)