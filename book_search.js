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

    // TO-DO: Check for potentially malicious searchTerms
    // TO-DO: Replace all single parenthesis (), braces {}, or brackets []
    
    // If end of search term is punctuation, only factor in beginning of search term.
    if (/[.,;!?]$/.test(searchTerm)) {
        regex = new RegExp("\\b" + searchTerm);
    } else {
        regex = new RegExp("\\b" + searchTerm +  "(\\b|\\(|\\))");
    }

    console.log(regex);
    for (let book of scannedTextObj) {
        for (let contentEle = 0; contentEle < book.Content.length; contentEle++) {
            let content = book.Content[contentEle];

            // Check for line break and whether next element exists in scannedTextObj
            if (content.Text.endsWith("-") && contentEle + 1 < book.Content.length) {
                
                // Obtains split word without "-"
                let related = content.Text.slice(0, -1).split(/\s+/).pop() + book.Content[contentEle + 1].Text.split(/\s+/)[0];

                // If searchTerm contains split word, combine lines.
                if (regex.test(related)) {
                    content.Text = content.Text.slice(0, -1);
                    content.Text += book.Content[contentEle + 1].Text;
                }
            }

            if (regex.test(content.Text)) {
                var obj  = {
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line,
                };
                result.Results.push(obj);
            }
        }
    }
    return result; 
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

const null_book = [
    {}
]

const ai2041_null = [
    {
        "Title": "A.I. 2041",
        "ISBN": "9990000528532",
        "Content": []
    }
]

const ai2041_single = [
    {
        "Title": "A.I. 2041",
        "ISBN": "9990000528532",
        "Content": [
            {
                "Page": 26,
                "Line": 1,
                "Text": "very differently. Deep learning requires much more data than humans,"
            },
            {
                "Page": 26,
                "Line": 2,
                "Text": "but once trained on big data, it will outperform humans by far for a given"
            },
            {
                "Page": 26,
                "Line": 3,
                "Text": "task, especially in dealing with quantitative optimization (like picking an"
            },
            {
                "Page": 26,
                "Line": 4,
                "Text": "ad to maximize likelihood of purchase, or recognizing a face out of a mil-"            
            },
            {
                "Page": 26,
                "Line": 5,
                "Text": "lion possible faces). While humans are limited in the number of things"            
            }
        ] 
    }
]

const ai2041_multiple = [
    {
        "Title": "A.I. 2041",
        "ISBN": "9990000528532",
        "Content": [
            {
                "Page": 26,
                "Line": 1,
                "Text": "very differently. Deep learning requires much more data than humans,"
            },
            {
                "Page": 26,
                "Line": 2,
                "Text": "but once trained on big data, it will outperform humans by far for a given"
            },
            {
                "Page": 26,
                "Line": 3,
                "Text": "task, especially in dealing with quantitative optimization (like picking an"
            },
            {
                "Page": 26,
                "Line": 4,
                "Text": "ad to maximize likelihood of purchase, or recognizing a face out of a mil-"            
            },
            {
                "Page": 26,
                "Line": 5,
                "Text": "lion possible faces). While humans are limited in the number of things"            
            }
        ] 
    },
    {
        "Title": "A.I. 2041",
        "ISBN": "9990000528532",
        "Content": [
            {
                "Page": 11,
                "Line": 15,
                "Text": "Nayana aimed to be vigilant in every interaction with GI. In her"
            },
            {
                "Page": 11,
                "Line": 16,
                "Text": "data literacy class in high school, she had learned that on the Inter-"
            },
            {
                "Page": 11,
                "Line": 17,
                "Text": "net every click might sell you out. She carefully studied the fine"
            },
        ] 
    },
    {
        "Title": "A.I. 2041",
        "ISBN": "9990000528532",
        "Content": [
            {
                "Page": 220,
                "Line": 18,
                "Text": "It didn't take long for Chamal to get the hang of the game."
            },
            {
                "Page": 220,
                "Line": 19,
                "Text": "Driving here was almost exactly the same as driving in the VR"
            },
            {
                "Page": 220,
                "Line": 20,
                "Text": "Café's games, except the engine here was, well, much better. It"
            },
        ] 
    },
]

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

/* */

function edgeCases() {

    /* Edge Case 1: Check for a word that is split by a line break. */
    /* Developer Assumption: Only first line featuring the split word is included. */
    const edgeTest1 = {
        "SearchTerm": "million",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 26,
                "Line": 4
            },
        ]
    }
    const edgeResult1 = findSearchTermInBooks("million", ai2041_single);
    if (JSON.stringify(edgeTest1) === JSON.stringify(edgeResult1)) {
        console.log("PASS: Edge Case 1");
    } else {
        console.log("FAIL: Edge Case 1");
        console.log("Expected:", edgeTest1);
        console.log("Received:", edgeResult1);
    }

    /* Edge Case 2: Check for a phrase that is split by a line break. */
    /* Developer Assumption: Only first line featuring the split phrase is included. */
    const edgeTest2 = {
        "SearchTerm": "face out of a million possible faces",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 26,
                "Line": 4
            },
        ]
    }
    const edgeResult2 = findSearchTermInBooks("face out of a million possible faces", ai2041_single);
    if (JSON.stringify(edgeTest2) === JSON.stringify(edgeResult2)) {
        console.log("PASS: Edge Case 2");
    } else {
        console.log("FAIL: Edge Case 2");
        console.log("Expected:", edgeTest2);
        console.log("Received:", edgeResult2);
    }

    /* Edge Case 3: Check for a word that ends with punctuation. */
    const edgeTest3 = {
        "SearchTerm": "differently.",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 26,
                "Line": 1
            }
        ]
    }
    const edgeResult3 = findSearchTermInBooks("differently.", ai2041_single);
    if (JSON.stringify(edgeTest3) === JSON.stringify(edgeResult3)) {
        console.log("PASS: Edge Case 3");
    } else {
        console.log("FAIL: Edge Case 3");
        console.log("Expected:", edgeResult3);
        console.log("Received:", edgeTest3);
    }
}
edgeCases();
/* Provided Test Cases */

/* Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/* Example output object */
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
const twentyLeaguesOut2 = {
    "SearchTerm": "profound;",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/* We can check that, given a known input, we get a known output. */

const exampleTest1 = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(exampleTest1)) {
    console.log("PASS: Example Test 1");
} else {
    console.log("FAIL: Example Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", exampleTest1);
}

/* We could choose to check that we get the right number of results. */

const exampleTest2 = findSearchTermInBooks("the", twentyLeaguesIn); 
if (exampleTest2.Results.length == 1) {
    console.log("PASS: Example Test 2");
} else {
    console.log("FAIL: Example Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", exampleTest2.Results.length);
}

const exampleTest3 = findSearchTermInBooks("profound;", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut2) === JSON.stringify(exampleTest3)) {
    console.log("PASS: Example Test 3");
} else {
    console.log("FAIL: Example Test 3");
    console.log("Expected:", twentyLeaguesOut2);
    console.log("Received:", exampleTest3);
}