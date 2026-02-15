from backend.app import app

# This is required for Vercel to recognize the Flask app
# The app object needs to be exposed as `app`
if __name__ == '__main__':
    app.run()
