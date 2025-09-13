# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
- ##### 1. Extensibility: The current CSV parser cannot handle various data types. For instance, when a column requires numerical values, it fails to verify whether the input is indeed a number.

- ##### 2. Functionality: The current CSV parser cannot handle cases where a field contains commas.

- ##### 3. Functionality: The current CSV parser fails to report an error when the number of data fields in a row exceeds the number of headers.

- ##### 4. Extensibility: The delimiter is fixed as "," but maybe the caller wants other delimiters.

- ##### 5. Extensibility: Lack of error handler.

- #### Step 2: Use an LLM to help expand your perspective.
- ##### The delimiter flexibility, error handling and data type handling overlap. I have missed points such as: custon quote, comment lines that begin with "#", trim whitespace option, configurable line endings, duplicate column names, large file handling and flexible input and output modes. It has missed points I mentioned such as the cases where a field contains commas or the number of headers dimatches with the number of fields in a row.

- ##### The previous prompt I used is that provided in the document. For the other two different ways of prompt, I tried to provide less information. I just said I am working on a CSV parser in TypeScript and asked for advice in terms of functionality and extensibilty (the last try I even got rid of these two categories). It then gave me much wider thoughts such as extending to other formats, pluggable transformations and encodings. It also provided me more and more codes when the prompt had less and less restrictions or info. However, it's answers didn't take into account the developer experience, robustness and edge cases, which are the aspects we want to consider. Most of the core content is the same such as handling different delimiters, triming whitespace safely, supporting headers, error handling and handling large files.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1. Functionality: As a user of the CSV parser, I want fields with embedded commas to be parsed correctly so that I don’t lose data integrity. (From my idea)

    2. Functionality: As a user of the CSV parser, I want the parser to detect mismatched field counts so that I know when a row has more or fewer values than the header defines. (From my idea)

    3. Extensibility: As a user of the CSV parser, I want built-in error handling so that I can catch and respond to invalid data. (From LLM and I)

    4. Extensibility: As a user of the CSV parser, I want type casting to be implemented so that I can work with data in its correct format without manual conversion. (From LLM and I)

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial ideas focused on extensibility like custom delimiters, error handling, data type validation and functionality such as handling commas in fields and mismatched headers. The LLM added ideas such as comment lines, trimming whitespace, duplicate headers, and large file handling, which I hadn’t considered. When prompting, if I provided more specified questions, it will center around these questions and answer in detail (such as considering developer experience). If I provided less information, its answer would be broader and it would give me more code examples. I resonated most with type casting and LLM's understanding of extensibility of developer expirence. I think there was nothing that I didn't resonate with.

- ### 1340 Supplement

    Singly linked list: it can be represented as a recursive structure where each node contains a value and a reference to the next node. The last node will be set to "null". Each node is defined as an object with a value field and a "next" field, which is either another node or "null". We can use ".nullable()" (I asked GPT) to enable null. This recursion is expressed in Zod with "z.lazy" so that the schema can safely refer to itself (I also learnt this from GPT). Thus, we will be able to respresent a linked list with a JSON structure containing "value" and "next" fields.

- #### 1. Correctness

    A correct CSV parser should reliably follow the CSV specification given and handle normal cases and edge cases consistently. It should be able to separate fields by delimiters, process embedded commas, and trim whitespaces only when appropriate. It must maintain the order of rows and columns, ensure that each row has the expected number of fields same as the number of headers. Additionally, it should not accept illegal input rather than silently producing incorrect results and it has to report different types of error when needed.

- #### 2. Random, On-Demand Generation

    Using a random CSV data generator allows us to perform wide tests using automatically generated data instead of just a few hand-made testcases. This helps generate edge cases we might not think of, such as unusual combinations of quotes and commas, empty fields, or very large datasets. By checking that the parser consistently produces well-structured outputs, rejects illegal inputs and produces proper error report, we can check the system's correctness and robustness.

- #### 3. Overall experience, Bugs encountered and resolved

    This sprint emphasizes more from the view of users and developers through brainstorming and involves a lot of writing rather than simply writing codes and passing testcases. I was surprised by how complicated and how many edge cases exist in CSV files that seems really simple. I did encounter some bugs and difficulties. One is at the line 45 in the test file. When I was doing task C and changed the code, it gave me an error "Object is of type Unknown". It seemed like TS couldn't know results is string[][] when I didn't provide schema (schema is undefined). Then I realized I should let it know it's a string, so I added "<string[]>" to "const results = await parseCSV<string[]>(PEOPLE_CSV_PATH);" and it could work. Another difficulty was that I didn't know how to validate and transform CSV row because I couldn't know the structure of the CSV beforehand, so I asked GPT and knew that "._def.shape()" could help me get the shape of the CSV file, so I resolved this problem.

- #### Errors/Bugs:
    At the line 44 in the test file: const results = await parseCSV<string[]>(PEOPLE_CSV_PATH); if I removed "<string[]>", then there will be an error "Object is of type Unknown". I don't know if that's the correct behavior or it means my parser can't handle the case when schema is not provided.

- #### Tests:
    Empty file: Ensures that parsing an empty CSV file returns an empty array.
    Header restriction: Verifies that header rows and subsequent data rows are parsed correctly.
    Whitespace: Confirms that extra spaces around values are trimmed during parsing.
    Name should be string and age should be int: Checks that names are strings and ages can be parsed as valid integers.
    Comma in between: Ensures that quoted fields containing commas are parsed as a single value.

- #### How To… 
    use: "npm test" to test

- #### Team members and contributions (include cs logins):
    N/A

- #### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
    Chat GPT

- #### Total estimated time it took to complete project:
    6 hours

- #### Link to GitHub Repo:  
    https://github.com/cs0320-f25/typescript-csv-McCarthyjfq