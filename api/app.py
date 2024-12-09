from flask import Flask, jsonify, request
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

JENKINS_API = 'http://127.0.0.1:8080/'
JENKINS_USER = 'admin'
JENKINS_TOKEN = '110ac1ba6c0021bb64e1e44a111ed5834b'

jenkins_auth_params = {}


@app.route('/')
def home():
    return jsonify({"status": "404 not found"})


@app.route('/jenkins/items')
def get_jenkins_items():
    items = requests.get(JENKINS_API+'/api/json', 
                        auth=requests.auth.HTTPBasicAuth(
                        JENKINS_USER, JENKINS_TOKEN))

    jobs = items.json().get('jobs', [])
    return jsonify(jobs)


@app.route('/jenkins/items/<job_name>')
def get_jenkins_job_by_name(job_name):
    item = requests.get(JENKINS_API + '/job/' + job_name +'/api/json', 
                        auth=requests.auth.HTTPBasicAuth(
                        JENKINS_USER, JENKINS_TOKEN))

    return jsonify({"job_name": item.json()})

@app.route('/jenkins/items/<job_name>/status')
def get_jenkins_job_status(job_name):
    try:
        response = requests.get(JENKINS_API + '/job/' + job_name +'/api/json', 
                    auth=requests.auth.HTTPBasicAuth(
                    JENKINS_USER, JENKINS_TOKEN))

        if response.status_code == 200:
            job_data = response.json()
            last_build = job_data.get("lastBuild", {})
            is_building = last_build.get("building", False)
            in_queue = last_build.get("inQueue", False)
            last_result = job_data.get("color", "unknown")

            status = {
                "job_name": job_data.get("name"),
                "last_build_number": last_build.get("number"),
                "is_building": is_building,
                "status": last_result,
                "in_queue": in_queue
            }
            return jsonify(status)
        else:
            return jsonify({"error": f"Job '{job_name}' not found"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/jenkins/run_job/<job_name>', methods = ['POST'])
def run_jenkins_job(job_name):
    job = requests.post(JENKINS_API + '/job/' + job_name +'/build', 
                    auth=requests.auth.HTTPBasicAuth(
                    JENKINS_USER, JENKINS_TOKEN))

    return jsonify({"status_code": job.status_code, "reason": job.reason})


@app.route('/jenkins/run_pjob/<job_name>', methods = ['POST'])
def run_parametrized_jenkins_job(job_name):
    params = request.get_json()
    
    # if job_name == 'param_job03':
    #     # params = {"ipaddress": "84.23.2.111", "dnsname": "isp_gw011"}
    #     params = request.get_json()
    #     print(params)

    ip_address = params.get('ipAddress')
    dns_name = params.get('dnsName')

    jenkins_url = f"{JENKINS_API}job/{job_name}/buildWithParameters?ipaddress={ip_address}&dnsname={dns_name}"
    
    # job = requests.post(JENKINS_API + '/job/' + job_name +'/buildWithParameters', 
    #                 auth=requests.auth.HTTPBasicAuth(
    #                 JENKINS_USER, JENKINS_TOKEN), params=params)

    job = requests.post(jenkins_url, auth=(JENKINS_USER, JENKINS_TOKEN))
    
    return jsonify({"status_code": job.status_code, "reason": job.reason})

@app.route('/vm/create', methods=['POST'])
def create_vm():
    params = request.get_json()
    if 'prod' in params['name']:
        return jsonify({
            "message": 
            "you dont have permission to cerate vm in prod env"
            }), 401

    return jsonify({'message': 'VM created successfully'}), 201


@app.route('/dnsrecords/create', methods=['POST'])
def create_dns_record():
    params = request.get_json()

    return jsonify({'message': 'Dns successfully created.'}), 201

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
