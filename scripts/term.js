const directory_type = "directory";
const downloadable_type = "downloadable";
let image = {
    "fileSystem": {
        "type": directory_type,
        "/": {
            "type": directory_type,
            "files": {
                "type": directory_type,
                "file1.txt": "contents",
                "file2.txt": "contents2",
                "skibidi.png": $('<img src="https://static.wikia.nocookie.net/skibidi-toilet-official/images/b/b1/GiantST.png/revision/latest/thumbnail/width/360/height/360?cb=20240205231829">'),
                "seal.wav": {
                    "type": downloadable_type,
                    "path" : "audio/seal.wav"
                }
            },
            "home": {
                "type": directory_type,
                "alex" : {
                    "type": directory_type,
                    "file1223123.txt" : "content"
                }
            },
            "file.txt": "hi"
        }
    }
};

let workingDirectory = "/";

$("#term").terminal({
    hello: function(what) {
        this.echo('Hello, ' + what +
                  '. Wellcome to this terminal.');
    },
    echo: function(...args) {
        this.echo(args);
    },
    pwd: function() {
        this.echo(workingDirectory);
    },
    ls: function() {
        wd = lookUp(workingDirectory)
        for (const key in wd) {
            if(key == "type") {
                continue;
            }
            if(typeof wd[key] == "object"){
                this.echo("[[;orange;]" + key + "]")
            }
            else {
                this.echo(key);
            }
        }
    },
    cd: function(path) {

        wd = lookUp(path, true);
        if(wd == false){
            this.echo(path + ": No such directory");

        }
        else if(wd.type != directory_type) {
            this.echo(path + ": Not a directory");
        }


        
    },
    skibidi: function() {
        this.echo($('<img src="https://static.wikia.nocookie.net/skibidi-toilet-official/images/b/b1/GiantST.png/revision/latest/thumbnail/width/360/height/360?cb=20240205231829">'));
    },
    gwomp: function() { 
        this.echo($('<img src="https://preview.redd.it/7hsu9d7bo1q81.jpg?width=1080&crop=smart&auto=webp&s=fa486f1f8502d7908af117ef1b902357f63bb0c0">'));
    },
    cat: function(path) {
        wd = lookUp(path);
        this.echo(wd);
    },
    open: function(path) {
        wd = lookUp(path);
        this.echo(wd);
    },
    help: function() {
        this.echo("ls: list content of current directory");
        this.echo("pwd: print working directory");
        this.echo("cd <path>: change directory");
        this.echo("cat <filepath>: print file contents (can also use open <filepath>)");
        this.echo("gwomp: gwomp");
    },
    download: function(path) {
        file = lookUp(path);
        if(file.type == downloadable_type) {
            let link = document.createElement("a");
            link.href = file.path;
            link.click();
            link.remove();
        }
    }
    // eval: function(ev) {
    //     this.echo(eval(ev));
    // }

}  ,
 {
    checkArity: false,
    greetings: 'Use "help" for list of commands',
    prompt() {
        return "[[;green;]" + workingDirectory + "] $ ";
    },
});

function lookUp(path, cd) {
    if (path == undefined){
        return false;
    }
    if(path.startsWith('..')) {
        let dirs = workingDirectory.split('/');
        let parentPath = "/";
        for(let i = 0; i < dirs.length - 1; i++) {
            parentPath += dirs[i];
        }
        console.log(parentPath);

        if(path.length > 3){
            let toAdd = path.substring(2);
            if (parentPath == "/"){
                toAdd = path.substring(3);
            }
            return lookUp(parentPath + toAdd);
        }
        
        
        path = parentPath;

    }
    

    else if(path.charAt(0) != "/") {
        if(workingDirectory.charAt(workingDirectory.length - 1) != "/") {
            path = "/" + path
        }
        path = workingDirectory + path;
    }

    let wd = image.fileSystem["/"];
    console.log(wd);
    if (path == "/") {
        workingDirectory = path;
        return wd;
    }
    let paths = path.split('/');


    for (let i = 1; i < paths.length; i++) {
        if (paths[i] in wd) {
            wd = wd[paths[i]];

        }
        else {
            return false;
        }
    }
    if(cd && wd.type == directory_type){
        workingDirectory = path;
    }
    return wd;
    
}

