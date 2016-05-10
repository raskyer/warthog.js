import sys
import xml.etree.ElementTree as ET
import cmd


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
        pattern = "{{ " + package_property.find('name').text + " }}"

        normalize_type(package_property.get("type"), user_input)

        data.append(user_input)
        patterns.append(pattern)

    return patterns, data


def get_file(file_name):
    file_in = "sources/" + file_name
    f = open(file_in, 'r')
    file_content = f.read()
    f.close()

    return fileData


def replace(file_content, patterns, user_data):
    new_content = file_content
    for key, pattern in enumerate(patterns):
        new_content = new_content.replace(pattern, user_data[key])

    return newData


def save_output(file_name, new_content):
    file_out = "output/" + file_name
    f = open(file_out, 'w')
    f.write(new_content)
    f.close()


class Warthog(cmd.Cmd):
    intro = "Warthog console helper"
    prompt = 'Warthog>> '

    def do_generate(self, arg):
        'Generate a warthog file from a package like: generate [1] [2] \n [1]: package \n [2]: language/tool'
        arg = arg.split()

        if len(arg) < 1:
            print("You must fill a package name and the associated tool \n")
            return

        split = arg[0].split("/")
        package = split[0]
        tool = split[1]

        path = package + "/" + arg[1]
        name = package + "/" + arg[1] + "." + lang

        xml_conf = ET.parse("conf/" + path + ".xml")
        root = xml_conf.getroot()

        patterns, user_data = hydrate(root.findall('property'))

        file_content = get_file(name)
        new_content = replace(file_content, patterns, user_data)
        save_output(name, new_content)

    def do_exit(self, arg):
        'Exit the program'
        return True

if __name__ == "__main__":
    Warthog().cmdloop()
