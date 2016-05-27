import sys, os
import xml.etree.ElementTree as ET


#GLOBAL
xml_conf = ET.parse("conf/config.xml")
root = xml_conf.getroot()
core = ["core", "core_cache", "core_caller"]


def normalize_type(property_type, user_input):
    if property_type == "STRING":
        user_input = "\"" + user_input + "\""

    return user_input


def hydrate(properties):
    patterns = []
    data = []

    for package_property in properties:
        placeholder = package_property.find("placeholder").text
        user_input = input(placeholder + ': ')
        pattern = "\"{{ " + package_property.find('name').text + " }}\""

        user_input = normalize_type(package_property.get("type"), user_input)

        data.append(user_input)
        patterns.append(pattern)

    return patterns, data


def get_file(file_name, obj_type):
    file_in = "sources/" + obj_type + "/" + file_name
    file_content = None

    if os.path.isfile(file_in): 
        f = open(file_in, 'r')
        file_content = f.read()
        f.close()
    else:
        print("Sources file don't exist at this dir: " + file_in)

    return file_content


def replace(file_content, patterns, user_data):
    new_content = file_content
    for key, pattern in enumerate(patterns):
        new_content = new_content.replace(pattern, user_data[key])

    return new_content


def save_output(dir_path, file_name, new_content):
    if not os.path.exists("outputs"):
        os.makedirs("outputs")

    if not os.path.exists("outputs/" + dir_path):
        os.makedirs("outputs/" + dir_path)

    file_out = "outputs/" + file_name
    f = open(file_out, 'w')
    f.write(new_content)
    f.close()


def generating_process(name, obj_type):
    obj = root.findall('./' + obj_type + '/properties[@id="' + name + '"]')

    if obj is None or len(obj) < 1:
        print("Warthog don't succeed getting config for this package: " + name)
        return

    if len(obj) > 1:
        print("This package appears multiple time in the config file, please fix the issue in conf/config.xml")

    obj = obj[0]
    obj_properties = obj.findall('property')
    obj_package = obj.find("type").text

    if obj_type == "core":
        obj_package = ""

    name = obj_package + "/" + name + ".js"

    patterns, user_data = hydrate(obj_properties)
    file_content = get_file(name, obj_type)
    new_content = replace(file_content, patterns, user_data)
    save_output(obj_package, name, new_content)


def ask_packages():
    i = 0
    packages_data = []

    for properties in root.findall("./packages/properties"):
        i += 1
        print(" " + str(i) + ": " + properties.get('id'))
        packages_data.append(properties.get('id'))


    user_input = input(' Your bundle (separeted by coma): ')

    if user_input is None or not user_input:
        return None

    data = user_input.split(", ")

    packages_names = []
    for d in data:
        packages_names.append(packages_data[int(d) - 1])

    return packages_names


def get_packages(arg):
    return packages


def clean(path):
    for the_file in os.listdir(path):
        file_path = os.path.join(path, the_file)

        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path): 
                clean(file_path)
        except Exception as e:
            print(e)


def build(builds_names):
    for name in builds_names:
        generating_process(name, "packages");

    for name in core:
        generating_process(name, "core")
