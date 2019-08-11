
(function() {
    var queue = [], paused = false, results;

    // publicly accessible
    this.test = function(name, fn) {
        queue.push(function() {
            results = document.getElementById("results");
            results = assert(true, name).appendChild(document.createElement("ul"));
            fn();
        });
        runTest();
    };

    // publicly accessible
    this.pause = function() {
        paused = true;
    };

    // publicly accessible
    this.resume = function() {
        paused = false;
        setTimeout(runTest, 1);
    };

    // private
    function runTest() {
        if (!paused && queue.length) {
            queue.shift()();
            if (!paused) {
                resume();
            }
        }
    }

    // publicly accessible
    this.assert = function assert(value, desc) {
        var li = document.createElement("li");
        li.className = value ? "pass" : "fail";
        li.appendChild(document.createTextNode(desc));
        results.appendChild(li);
        if (!value) {
            li.parentNode.parentNode.className = "fail";
        }
        return li;
    };
})();




// (function() {
//     var results;
//     this.assert = function assert(value, desc) {
//         var li = document.createElement("li");
//         li.className = value ? "pass" : "fail";
//         li.appendChild(document.createTextNode(desc));
//         results.appendChild(li);
//         if (!value) {
//             li.parentNode.parentNode.className = "fail";
//         }
//         return li;
//     };

//     this.test = function test(name, fn) {
//         results = document.getElementById("results");
//         results = assert(true, name).appendChild(document.createElement("ul"));
//         fn();
//     };
// })();




// function assert(value, desc) {
//     var li = document.createElement("li");
//     li.className = value ? "pass" : "fail";
//     li.appendChild(document.createTextNode(desc));
//     document.getElementById("results").appendChild(li);
// }