from django.contrib import admin
from .models import Checklist, Task, Member

class ChecklistAdmin(admin.ModelAdmin):
	list_display = ('title', 'description')

class TaskAdmin(admin.ModelAdmin):
	list_display = ('title', 'checklist', 'description', 'duration', 'done')

class MemberAdmin(admin.ModelAdmin):
	list_display = ('user',)

admin.site.register(Checklist, ChecklistAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Member, MemberAdmin)