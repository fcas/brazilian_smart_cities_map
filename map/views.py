from django.shortcuts import render_to_response

def index(request):
	'display map'
	return render_to_response('map/index.html',{})