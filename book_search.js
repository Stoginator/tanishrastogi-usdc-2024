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

    if (searchTerm.length <= 0 || scannedTextObj.length <= 0) {
        return result;
    }

    // TO-DO: Check for potentially malicious searchTerms
    // TO-DO: Replace all single parenthesis (), braces {}, or brackets [] from user --> breaks RegEx
    
    // If end of search term is punctuation, only look up beginning of search term.
    if (/[.,;!?:]$/.test(searchTerm)) {
        regex = new RegExp("\\b" + searchTerm);
    } else {
        regex = new RegExp("\\b" + searchTerm +  "(\\b|\\(|\\))");
    }

    for (let book of scannedTextObj) {
        for (let contentEle = 0; contentEle < book.Content.length; contentEle++) {
            let content = book.Content[contentEle];

            let lineBreak = false;
            // Check for line break and whether next element exists in scannedTextObj
            if (content.Text.endsWith("-") && contentEle + 1 < book.Content.length) {
                
                // Obtains split word without "-"
                let related = content.Text.slice(0, -1).split(/\s+/).pop() + book.Content[contentEle + 1].Text.split(/\s+/)[0];

                // If searchTerm contains split word, combine lines.
                if (regex.test(related)) {
                    content.Text = content.Text.slice(0, -1);
                    content.Text += book.Content[contentEle + 1].Text;
                    lineBreak = true;
                }
            }

            // Add details of query if found
            if (regex.test(content.Text)) {
                var obj  = {
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line,
                };
                result.Results.push(obj);
                if (lineBreak) { 
                    contentEle++; 
                }
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
                "Text": "Nayana aimed to be vigilant in every interaction with GI; in her"
            },
            {
                "Page": 11,
                "Line": 16,
                "Text": "data literacy class in high school, she had learned that on the Inter-"
            },
            {
                "Page": 11,
                "Line": 17,
                "Text": "net every click might sell you out. She carefully studied how we are limited"
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
                "Text": "Café\'s games, except the engine here was, well, much better. It"
            },
        ] 
    },
]

function negativeCases() {
    /* Negative Case 1: Empty searchTerm */
    const negTest1 = {
        "SearchTerm": "",
        "Results": []
    }
    const negResult1 = findSearchTermInBooks("", ai2041_single);
    if (JSON.stringify(negResult1) === JSON.stringify(negTest1)) {
        console.log("PASS: Negative Case 1");
    } else {
        console.log("FAIL: Negative Case 1");
        console.log("Expected:", negTest1);
        console.log("Received:", negResult1);
    }

    /* Negative Case 2: Empty Scanned Book Content */
    const negTest2 = {
        "SearchTerm": "The",
        "Results": []
    }
    const negResult2 = findSearchTermInBooks("The", ai2041_null);
    if (JSON.stringify(negResult2) === JSON.stringify(negTest2)) {
        console.log("PASS: Negative Case 2");
    } else {
        console.log("FAIL: Negative Case 2");
        console.log("Expected:", negTest2);
        console.log("Received:", negResult2);
    }

    /* Negative Case 3: Search for a word that does NOT exists in the scanned book content. */
    const negTest3 = {
        "SearchTerm": "The",
        "Results": []
    }
    const negResult3 = findSearchTermInBooks("The", ai2041_multiple);
    if (JSON.stringify(negResult3) === JSON.stringify(negTest3)) {
        console.log("PASS: Negative Case 3");
    } else {
        console.log("FAIL: Negative Case 3");
        console.log("Expected:", negTest3);
        console.log("Received:", negResult3);
    }

    /* Negative Case 4: Search for a phrase does NOT exists in the scanned book content. */
    const negTest4 = {
        "SearchTerm": "The whales lived on",
        "Results": []
    }
    const negResult4 = findSearchTermInBooks("The whales lived on", ai2041_multiple);
    if (JSON.stringify(negResult4) === JSON.stringify(negTest4)) {
        console.log("PASS: Negative Case 4");
    } else {
        console.log("FAIL: Negative Case 4");
        console.log("Expected:", negTest4);
        console.log("Received:", negResult4);
    }
}
negativeCases();

function positiveCases() {
    /* Positive Case 1: Search for a word that exists once in the scanned book content. */
    const posTest1 = {
        "SearchTerm": "Deep",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 26,
                "Line": 1
            }
        ]
    }
    const posResult1 = findSearchTermInBooks("Deep", ai2041_multiple);
    if (JSON.stringify(posResult1) === JSON.stringify(posTest1)) {
        console.log("PASS: Positive Case 1");
    } else {
        console.log("FAIL: Positive Case 1");
        console.log("Expected:", posTest1);
        console.log("Received:", posResult1);
    }

    /* Positive Case 2: Search for a phrase that exists once in the scanned book content. */
    const posTest2 = {
        "SearchTerm": "Deep learning",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 26,
                "Line": 1
            }
        ]
    }
    const posResult2 = findSearchTermInBooks("Deep learning", ai2041_multiple);
    if (JSON.stringify(posResult2) === JSON.stringify(posTest2)) {
        console.log("PASS: Positive Case 1");
    } else {
        console.log("FAIL: Positive Case 1");
        console.log("Expected:", posTest2);
        console.log("Received:", posResult2);
    }

    /* Positive Case 3: Check for a word that appears multiple times in a book */
    const posTest3 = {
        SearchTerm: "to", 
        Results: [
            {
                "ISBN": "9990000528532", 
                "Page": 26, 
                "Line": 4
            }, 
            {
                "ISBN": "9990000528532", 
                "Page": 11,
                "Line": 15,
            }, 
            {
                "ISBN": "9990000528532", 
                "Page": 220, 
                "Line": 18
            }
        ]
    }
    const posResult3 = findSearchTermInBooks("to", ai2041_multiple);
    if (JSON.stringify(posResult3) === JSON.stringify(posTest3)) {
        console.log("PASS: Positive Case 3");
    } else {
        console.log("FAIL: Positive Case 3");
        console.log("Expected:", posTest3);
        console.log("Received:", posResult3);
    }

    /* Positive Case 4: Check for a phrase that appears in multiple books */
    const posTest4 = {
        SearchTerm: "are limited", 
        Results: [
            {
                "ISBN": "9990000528532", 
                "Page": 26, 
                "Line": 5
            }, 
            {
                "ISBN": "9990000528532", 
                "Page": 11,
                "Line": 17,
            }
        ]
    }
    const posResult4 = findSearchTermInBooks("are limited", ai2041_multiple);
    if (JSON.stringify(posResult4) === JSON.stringify(posTest4)) {
        console.log("PASS: Positive Case 4");
    } else {
        console.log("FAIL: Positive Case 4");
        console.log("Expected:", posTest4);
        console.log("Received:", posResult4);
    }
}
positiveCases();

function caseSensitiveCases() {
    /* Using scanned text object with multiple book entries */

    /* Case Sensitive Case 1: Check for a word that exists in lower-case form, but NOT capitalized form */
    const caseTest1 = {
        "SearchTerm": "The",
        "Results": []
    }
    const caseResult1 = findSearchTermInBooks("The", ai2041_multiple);
    if (JSON.stringify(caseResult1) === JSON.stringify(caseTest1)) {
        console.log("PASS: Case Sensitive Test 1");
    } else {
        console.log("FAIL: Case Sensitive Test 1");
        console.log("Expected:", caseTest1);
        console.log("Received:", caseResult1);
    }

    /* Case Sensitive Case 2: Check for a word that in only capitalized form */
    const caseTest2 = {
        "SearchTerm": "GI",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 11,
                "Line": 15
            },
        ]
    }
    const caseResult2 = findSearchTermInBooks("GI", ai2041_multiple);
    if (JSON.stringify(caseResult2) === JSON.stringify(caseTest2)) {
        console.log("PASS: Case Sensitive Test 2");
    } else {
        console.log("FAIL: Case Sensitive Test 2");
        console.log("Expected:", caseTest2);
        console.log("Received:", caseResult2);
    }

    /* Case Sensitive Case 3: Check for a word that in only capitalized form followed by punctuation */
    const caseTest3 = {
        "SearchTerm": "GI;",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 11,
                "Line": 15
            },
        ]
    }
    const caseResult3 = findSearchTermInBooks("GI;", ai2041_multiple);
    if (JSON.stringify(caseResult3) === JSON.stringify(caseTest3)) {
        console.log("PASS: Case Sensitive Test 3");
    } else {
        console.log("FAIL: Case Sensitive Test 3");
        console.log("Expected:", caseTest3);
        console.log("Received:", caseResult3);
    }
}
caseSensitiveCases();

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
        console.log("Expected:", edgeTest3);
        console.log("Received:", edgeResult3);
    }

    /* Edge Case 4: Check for a phrase with multliple special characters in one line. */
    const edgeTest4 = {
        "SearchTerm": "Café's games",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 220,
                "Line": 20
            }
        ]
    }
    const edgeResult4 = findSearchTermInBooks("Café's games", ai2041_multiple);
    if (JSON.stringify(edgeTest4) === JSON.stringify(edgeResult4)) {
        console.log("PASS: Edge Case 4");
    } else {
        console.log("FAIL: Edge Case 4");
        console.log("Expected:", edgeTest4);
        console.log("Received:", edgeResult4);
    }

    /* Edge Case 5: Check for a phrase with multliple special characters across two lines. */
    const edgeTest5 = {
        "SearchTerm": "VR Café's games",
        "Results": [
            {
                "ISBN": "9990000528532",
                "Page": 220,
                "Line": 19
            }
        ]
    }
    const edgeResult5 = findSearchTermInBooks("VR Café's games", ai2041_multiple);
    if (JSON.stringify(edgeTest4) === JSON.stringify(edgeResult5)) {
        console.log("PASS: Edge Case 5");
    } else {
        console.log("FAIL: Edge Case 5");
        console.log("Expected:", edgeTest5);
        console.log("Received:", edgeResult5);
        console.log("Logical error in program --> cannot detect phrases spanning two or more lines")
    }
}
edgeCases();