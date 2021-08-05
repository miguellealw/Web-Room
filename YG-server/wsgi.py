from YG_server import create_app

## When deploying configure server so this is the entry point 
# ====== For DEV
app = create_app()

# ====== For PROD
# app = create_app('prod')

# ====== For TESTING
# app = create_app('testing')

if __name__ == "__main__":
    app.run(host='0.0.0.0')