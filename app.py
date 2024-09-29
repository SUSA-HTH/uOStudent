from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/course-data', methods=['POST'])
def get_course_data():
    # Get course name and course code from the request
    data = request.get_json()
    course_name = data.get('courseName')
    course_code = data.get('courseCode')

    try:
        # Use subprocess to call the uOAPI command with the provided course code
        result = subprocess.run(
            ['uoapi', 'timetable', '--term', 'fall', '--year', '2023', course_code],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            return jsonify({'error': 'Failed to fetch course data', 'details': result.stderr}), 500

        # Send the course data as a response
        return jsonify({'data': result.stdout})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
