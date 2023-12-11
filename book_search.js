/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    if (searchTerm.length <= 0 || scannedTextObj.length <= 0) {return result;}

    // What if search term, itself, has special characters?

    // What if search term occurs on a line break?

    // What if search term has a special character at the end? (i.e. not a space)

    const regex = new RegExp(` ${searchTerm} `);
    console.log(regex);
    for (let book of scannedTextObj)
    {
        for (let content of book.Content)
        {
            console.log(content);
            if (content.Text.search(regex) > -1)
            {
                var obj  = {
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line,
                };
                result.Results.push(obj)
            }
        }
    }


    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by theatrical momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound! And, however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
*/

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * 
*/

/* Empty search

*/

/* Empty Scanned Book Content

*/

/* Search for a word that exists in the scanned book content. 

*/

/* Search for a word that does NOT exists in the scanned book content. 

*/

/* Search for a phase that exists in the scanned book content. 

*/

/* Search for a phrase does NOT exists in the scanned book content.

*/

/* Edge Case 1: */
const test2result = findSearchTermInBooks("!", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test3result);
}

/* We can check that, given a known input, we get a known output. */
const test3result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test3result);
}

/* We could choose to check that we get the right number of results. */
const test4result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test4result.Results.length == 1) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test4result.Results.length);
}
