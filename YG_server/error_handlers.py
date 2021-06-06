from flask import jsonify

def resource_not_found(e):
  return jsonify(error=str(e))

def resource_could_not_be_created(e):
  return jsonify(error=str(e))