from YG_server import create_app


## When deploying configure server so this is the entry point 
app = create_app()

if __name__ == "__main__":
    app.run(host='0.0.0.0')