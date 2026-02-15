
import os
import sys

# Add the 'backend' directory to sys.path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.append(backend_path)

from backend.app import app

# Vercel needs the 'app' variable to be exposed
if __name__ == '__main__':
    app.run()
