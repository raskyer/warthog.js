import cmd
import app.warthog_lib as wt


class Warthog(cmd.Cmd):
    intro = "Warthog console helper"
    prompt = 'Warthog@ '

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

        generating_process(name);


    def do_build(self, arg):
        'Build the all application warthog inside an only one file like: build [1], [2], ... \n [1], [2]: (optional) Name of package you want to build with warthog'

        accept_clean = input("\n \n !!! Be carefull, all the content of './outputs' will be rewrite (type n to abort) !!! \n \n Do you accept to lose outputs ? (y = yes, n = no): ")

        if accept_clean != "y":
            return False

        print("\n")

        if len(arg) < 1:
            packages_names = wt.ask_packages();
        else:
            packages_names = wt.get_packages(arg);

        wt.clean("outputs");
        wt.build(packages_names);
        #minify()
        #obfuscate
        #save


    def do_exit(self, arg):
        'Exit the program'
        return True


if __name__ == "__main__":
    Warthog().cmdloop()
