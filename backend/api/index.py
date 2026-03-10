import os
import sys

# Add the 'backend' directory to sys.path
backend_path = os.path.dirname(os.path.dirname(__file__))
sys.path.append(backend_path)

from app import app

# Vercel needs the 'app' variable to be exposed
if __name__ == '__main__':
    app.run()
