'use client'
import { AppProvider } from "./context"
import Navbar from "./navbar"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from '../firebase/config'
import {useCollection} from "react-firebase-hooks/firestore"
import { collection, getFirestore, setDoc, getDoc, doc } from "firebase/firestore"
import Player from "./classes/player"
import Contract from "./classes/contract"
import Attributes from "./classes/attributes"
import { useState, useEffect } from "react"

export default function Home() {
  const [user] = useAuthState(auth)
  const firestore = getFirestore()
  const [users, usersLoading, usersError] = useCollection(collection(firestore, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
  const [saves, setSaves] = useState<string[]>([])
  const [saveName, setSaveName] = useState("")

  const setSavesDocument = async () => {
    /*if(saves.includes(saveName)){
      return
    }*/
    const convertRoster = (map: Map<string, Player[]>) => {
      return Object.fromEntries(
        Array.from(map.entries()).map(([key, players]) => [
          key,
          players.map(player => player.toObject())
        ])
      )
    }
    const docRef = doc(firestore, "users", user!.uid)
    await setDoc(docRef, {
      saves : [{
        saveName: saveName,
        roster: convertRoster(defaultRoster),
        usedNames: defaultUsedNames
      }]
    }, {merge: true})
  }

  const firstNames = ["Jacob", "Michael", "Ethan", "Joshua", "Daniel", "Alexander", "Anthony", "William", "Christopher", "Matthew", "Jayden", "Andrew", "Joseph", "David", "Noah", "Aiden", "James", "Ryan", "Logan", "John", "Nathan", "Elijah", "Christian", "Gabriel", "Benjamin", "Jonathan", "Tyler", "Samuel", "Nicholas", "Gavin", "Dylan", "Jackson", "Brandon", "Caleb", "Mason", "Angel", "Isaac", "Evan", "Jack", "Kevin", "Jose", "Isaiah", "Luke", "Landon", "Justin", "Lucas", "Zachary", "Jordan", "Robert", "Aaron", "Brayden", "Thomas", "Cameron", "Hunter", "Austin", "Adrian", "Connor", "Owen", "Aidan", "Jason", "Julian", "Wyatt", "Charles", "Luis", "Carter", "Juan", "Chase", "Diego", "Jeremiah", "Brody", "Xavier", "Adam", "Carlos", "Sebastian", "Liam", "Hayden", "Nathaniel", "Henry", "Jesus", "Ian", "Tristan", "Bryan", "Sean", "Cole", "Alex", "Eric", "Brian", "Jaden", "Carson", "Blake", "Ayden", "Cooper", "Dominic", "Brady", "Caden", "Josiah", "Kyle", "Colton", "Kaden", "Eli", "Miguel", "Antonio", "Parker", "Steven", "Alejandro", "Riley", "Richard", "Timothy", "Devin", "Jesse", "Victor", "Jake", "Joel", "Colin", "Kaleb", "Bryce", "Levi", "Oliver", "Oscar", "Vincent", "Ashton", "Cody", "Micah", "Preston", "Marcus", "Max", "Patrick", "Seth", "Jeremy", "Peyton", "Nolan", "Ivan", "Damian", "Maxwell", "Alan", "Kenneth", "Jonah", "Jorge", "Mark", "Giovanni", "Eduardo", "Grant", "Collin", "Gage", "Omar", "Emmanuel", "Trevor", "Edward", "Ricardo", "Cristian", "Nicolas", "Kayden", "George", "Jaxon", "Paul", "Braden", "Elias", "Andres", "Derek", "Garrett", "Tanner", "Malachi", "Conner", "Fernando", "Cesar", "Javier", "Miles", "Jaiden", "Alexis", "Leonardo", "Santiago", "Francisco", "Cayden", "Shane", "Edwin", "Hudson", "Travis", "Bryson", "Erick", "Jace", "Hector", "Josue", "Peter", "Jaylen", "Mario", "Manuel", "Abraham", "Grayson", "Damien", "Kaiden", "Spencer", "Stephen", "Edgar", "Wesley", "Shawn", "Trenton", "Jared", "Jeffrey", "Landen", "Johnathan", "Bradley", "Braxton", "Ryder", "Camden", "Roman", "Asher", "Brendan", "Maddox", "Sergio", "Israel", "Andy", "Lincoln", "Erik", "Donovan", "Raymond", "Avery", "Rylan", "Dalton", "Harrison", "Andre", "Martin", "Keegan", "Marco", "Jude", "Sawyer", "Dakota", "Leo", "Calvin", "Kai", "Drake", "Troy", "Zion", "Clayton", "Roberto", "Zane", "Gregory", "Tucker", "Rafael", "Kingston", "Dominick", "Ezekiel", "Griffin", "Devon", "Drew", "Lukas", "Johnny", "Ty", "Pedro", "Tyson", "Caiden", "Mateo", "Braylon", "Cash", "Aden", "Chance", "Taylor", "Marcos", "Maximus", "Ruben", "Emanuel", "Simon", "Corbin", "Brennan", "Dillon", "Skyler", "Myles", "Xander", "Jaxson", "Dawson", "Kameron", "Kyler", "Axel", "Colby", "Jonas", "Joaquin", "Payton", "Brock", "Frank", "Enrique", "Quinn", "Emilio", "Malik", "Grady", "Angelo", "Julio", "Derrick", "Raul", "Fabian", "Corey", "Gerardo", "Dante", "Ezra", "Armando", "Allen", "Theodore", "Gael", "Amir", "Zander", "Adan", "Maximilian", "Randy", "Easton", "Dustin", "Luca", "Phillip", "Julius", "Charlie", "Ronald", "Jakob", "Cade", "Brett", "Trent", "Silas", "Keith", "Emiliano", "Trey", "Jalen", "Darius", "Lane", "Jerry", "Jaime", "Scott", "Graham", "Weston", "Braydon", "Anderson", "Rodrigo", "Pablo", "Saul", "Danny", "Donald", "Elliot", "Brayan", "Dallas", "Lorenzo", "Casey", "Mitchell", "Alberto", "Tristen", "Rowan", "Jayson", "Gustavo", "Aaden", "Amari", "Dean", "Braeden", "Declan", "Chris", "Ismael", "Dane", "Louis", "Arturo", "Brenden", "Felix", "Jimmy", "Cohen", "Tony", "Holden", "Reid", "Abel", "Bennett", "Zackary", "Arthur", "Nehemiah", "Ricky", "Esteban", "Cruz", "Finn", "Mauricio", "Dennis", "Keaton", "Albert", "Marvin", "Mathew", "Larry", "Moises", "Issac", "Philip", "Quentin", "Curtis", "Greyson", "Jameson", "Everett", "Jayce", "Darren", "Elliott", "Uriel", "Alfredo", "Hugo", "Alec", "Jamari", "Marshall", "Walter", "Judah", "Jay", "Lance", "Beau", "Ali", "Landyn", "Yahir", "Phoenix", "Nickolas", "Kobe", "Bryant", "Maurice", "Russell", "Leland", "Colten", "Reed", "Davis", "Joe", "Ernesto", "Desmond", "Kade", "Reece", "Morgan", "Ramon", "Rocco", "Orlando", "Ryker", "Brodie", "Paxton", "Jacoby", "Douglas", "Kristopher", "Gary", "Lawrence", "Izaiah", "Solomon", "Nikolas", "Mekhi", "Justice", "Tate", "Jaydon", "Salvador", "Shaun", "Alvin", "Eddie", "Kane", "Davion", "Zachariah", "Dorian", "Titus", "Kellen", "Camron", "Isiah", "Javon", "Nasir", "Milo", "Johan", "Byron", "Jasper", "Jonathon", "Chad", "Marc", "Kelvin", "Chandler", "Sam", "Cory", "Deandre", "River", "Reese", "Roger", "Quinton", "Talon", "Romeo", "Franklin", "Noel", "Alijah", "Guillermo", "Gunner", "Damon", "Jadon", "Emerson", "Micheal", "Bruce", "Terry", "Kolton", "Melvin", "Beckett", "Porter", "August", "Brycen", "Dayton", "Jamarion", "Leonel", "Karson", "Zayden", "Keagan", "Carl", "Khalil", "Cristopher", "Nelson", "Braiden", "Moses", "Isaias", "Roy", "Triston", "Walker", "Kale", "Jermaine", "Leon", "Rodney", "Kristian", "Mohamed", "Ronan", "Pierce", "Trace", "Warren", "Jeffery", "Maverick", "Cyrus", "Quincy", "Nathanael", "Skylar", "Tommy", "Conor", "Noe", "Ezequiel", "Demetrius", "Jaylin", "Kendrick", "Frederick", "Terrance", "Bobby", "Jamison", "Jon", "Rohan", "Jett", "Kieran", "Tobias", "Ari", "Colt", "Gideon", "Felipe", "Kenny", "Wilson", "Orion", "Kamari", "Gunnar", "Jessie", "Alonzo", "Gianni", "Omari", "Waylon", "Malcolm", "Emmett", "Abram", "Julien", "London", "Tomas", "Allan", "Terrell", "Matteo", "Tristin", "Jairo", "Reginald", "Brent", "Ahmad", "Yandel", "Rene", "Willie", "Boston", "Billy", "Marlon", "Trevon", "Aydan", "Jamal", "Aldo", "Ariel", "Cason", "Braylen", "Javion", "Joey", "Rogelio", "Ahmed", "Dominik", "Brendon", "Toby", "Kody", "Marquis", "Ulises", "Armani", "Adriel", "Alfonso", "Branden", "Will", "Craig", "Ibrahim", "Osvaldo", "Wade", "Harley", "Steve", "Davin", "Deshawn", "Kason", "Damion", "Jaylon", "Jefferson", "Aron", "Brooks", "Darian", "Gerald", "Rolando", "Terrence", "Enzo", "Kian", "Ryland", "Barrett", "Jaeden", "Ben", "Bradyn", "Giovani", "Blaine", "Madden", "Jerome", "Muhammad", "Ronnie", "Layne", "Kolby", "Leonard", "Vicente", "Cale", "Alessandro", "Zachery", "Gavyn", "Aydin", "Xzavier", "Malakai", "Raphael", "Cannon", "Rudy", "Asa", "Darrell", "Giancarlo", "Elisha", "Junior", "Zackery", "Alvaro", "Lewis", "Valentin", "Deacon", "Jase", "Harry", "Kendall", "Rashad", "Finnegan", "Mohammed", "Ramiro", "Cedric", "Brennen", "Santino", "Stanley", "Tyrone", "Chace", "Francis", "Johnathon", "Teagan", "Zechariah", "Alonso", "Kaeden", "Kamden", "Gilberto", "Ray", "Karter", "Luciano", "Nico", "Kole", "Aryan", "Draven", "Jamie", "Misael", "Lee", "Alexzander", "Camren", "Giovanny", "Amare", "Rhett", "Rhys", "Rodolfo", "Nash", "Markus", "Deven", "Mohammad", "Moshe", "Quintin", "Dwayne", "Memphis", "Atticus", "Davian", "Eugene", "Jax", "Antoine", "Wayne", "Randall", "Semaj", "Uriah", "Clark", "Aidyn", "Jorden", "Maxim", "Aditya", "Lawson", "Messiah", "Korbin", "Sullivan", "Freddy", "Demarcus", "Neil", "Brice", "King", "Davon", "Elvis", "Ace", "Dexter", "Heath", "Duncan", "Jamar", "Sincere", "Irvin", "Remington", "Kadin", "Soren", "Tyree", "Damarion", "Talan", "Adrien", "Gilbert", "Keenan", "Darnell", "Adolfo", "Tristian", "Derick", "Isai", "Rylee", "Gauge", "Harold", "Kareem", "Deangelo", "Agustin", "Coleman", "Zavier", "Lamar", "Emery", "Jaydin", "Devan", "Jordyn", "Mathias", "Prince", "Sage", "Seamus", "Jasiah", "Efrain", "Darryl", "Arjun", "Mike", "Roland", "Conrad", "Kamron", "Hamza", "Santos", "Frankie", "Dominique", "Marley", "Vance", "Dax", "Jamir", "Kylan", "Todd", "Maximo", "Jabari", "Matthias", "Haiden", "Luka", "Marcelo", "Keon", "Layton", "Tyrell", "Kash", "Raiden", "Cullen", "Donte", "Jovani", "Cordell", "Kasen", "Rory", "Alfred", "Darwin", "Ernest", "Bailey", "Gaige", "Hassan", "Jamarcus", "Killian", "Augustus", "Trevin", "Zain", "Ellis", "Rex", "Yusuf", "Bruno", "Jaidyn", "Justus", "Ronin", "Humberto", "Jaquan", "Josh", "Kasey", "Winston", "Dashawn", "Lucian", "Matias", "Sidney", "Ignacio", "Nigel", "Van", "Elian", "Finley", "Jaron", "Addison", "Aedan", "Braedon", "Jadyn", "Konner", "Zayne", "Franco", "Niko", "Savion", "Cristofer", "Deon", "Krish", "Anton", "Brogan", "Cael", "Coby", "Kymani", "Marcel", "Yair", "Dale", "Bo", "Jordon", "Samir", "Darien", "Zaire", "Ross", "Vaughn", "Devyn", "Kenyon", "Clay", "Dario", "Ishaan", "Jair", "Kael", "Adonis", "Jovanny", "Clinton", "Rey", "Chaim", "German", "Harper", "Nathen", "Rigoberto", "Sonny", "Glenn", "Octavio", "Blaze", "Keshawn", "Ralph", "Ean", "Nikhil", "Rayan", "Sterling", "Branson", "Jadiel", "Dillan", "Jeramiah", "Koen", "Konnor", "Antwan", "Houston", "Tyrese", "Dereon", "Leonidas", "Zack", "Fisher", "Jaydan", "Quinten", "Nick", "Urijah", "Darion", "Jovan", "Salvatore", "Beckham", "Jarrett", "Antony", "Eden", "Makai", "Zaiden", "Broderick", "Camryn", "Malaki", "Nikolai", "Howard", "Immanuel", "Demarion", "Valentino", "Jovanni", "Ayaan", "Ethen", "Leandro", "Royce", "Yael", "Yosef", "Jean", "Marquise", "Alden", "Leroy", "Gaven", "Jovany", "Tyshawn", "Aarav", "Kadyn", "Milton", "Zaid", "Kelton", "Tripp", "Kamren", "Slade", "Hezekiah", "Jakobe", "Nathanial", "Rishi", "Shamar", "Geovanni", "Pranav", "Roderick", "Bentley", "Clarence", "Lyric", "Bernard", "Carmelo", "Denzel", "Maximillian", "Reynaldo", "Cassius", "Gordon", "Reuben", "Samson", "Yadiel", "Jayvon", "Reilly", "Sheldon", "Abdullah", "Jagger", "Thaddeus", "Case", "Kyson", "Lamont", "Chaz", "Makhi", "Jan", "Marques", "Oswaldo", "Donavan", "Keyon", "Kyan", "Simeon", "Trystan", "Andreas", "Dangelo", "Landin", "Reagan", "Turner", "Arnav", "Brenton", "Callum", "Jayvion", "Bridger", "Sammy", "Deegan", "Jaylan", "Lennon", "Odin", "Abdiel", "Jerimiah", "Eliezer", "Bronson", "Cornelius", "Pierre", "Cortez", "Baron", "Carlo", "Carsen", "Fletcher", "Izayah", "Kolten", "Damari", "Hugh", "Jensen", "Yurem"]
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen", "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres", "Parker", "Collins", "Edwards", "Stewart", "Flores", "Morris", "Nguyen", "Murphy", "Rivera", "Cook", "Rogers", "Morgan", "Peterson", "Cooper", "Reed", "Bailey", "Bell", "Gomez", "Kelly", "Howard", "Ward", "Cox", "Diaz", "Richardson", "Wood", "Watson", "Brooks", "Bennett", "Gray", "James", "Reyes", "Cruz", "Hughes", "Price", "Myers", "Long", "Foster", "Sanders", "Ross", "Morales", "Powell", "Sullivan", "Russell", "Ortiz", "Jenkins", "Gutierrez", "Perry", "Butler", "Barnes", "Fisher", "Henderson", "Coleman", "Simmons", "Patterson", "Jordan", "Reynolds", "Hamilton", "Graham", "Kim", "Gonzales", "Alexander", "Ramos", "Wallace", "Griffin", "West", "Cole", "Hayes", "Chavez", "Gibson", "Bryant", "Ellis", "Stevens", "Murray", "Ford", "Marshall", "Owens", "Mcdonald", "Harrison", "Ruiz", "Kennedy", "Wells", "Alvarez", "Woods", "Mendoza", "Castillo", "Olson", "Webb", "Washington", "Tucker", "Freeman", "Burns", "Henry", "Vasquez", "Snyder", "Simpson", "Crawford", "Jimenez", "Porter", "Mason", "Shaw", "Gordon", "Wagner", "Hunter", "Romero", "Hicks", "Dixon", "Hunt", "Palmer", "Robertson", "Black", "Holmes", "Stone", "Meyer", "Boyd", "Mills", "Warren", "Fox", "Rose", "Rice", "Moreno", "Schmidt", "Patel", "Ferguson", "Nichols", "Herrera", "Medina", "Ryan", "Fernandez", "Weaver", "Daniels", "Stephens", "Gardner", "Payne", "Kelley", "Dunn", "Pierce", "Arnold", "Tran", "Spencer", "Peters", "Hawkins", "Grant", "Hansen", "Castro", "Hoffman", "Hart", "Elliott", "Cunningham", "Knight", "Bradley", "Carroll", "Hudson", "Duncan", "Armstrong", "Berry", "Andrews", "Johnston", "Ray", "Lane", "Riley", "Carpenter", "Perkins", "Aguilar", "Silva", "Richards", "Willis", "Matthews", "Chapman", "Lawrence", "Garza", "Vargas", "Watkins", "Wheeler", "Larson", "Carlson", "Harper", "George", "Greene", "Burke", "Guzman", "Morrison", "Munoz", "Jacobs", "Obrien", "Lawson", "Franklin", "Lynch", "Bishop", "Carr", "Salazar", "Austin", "Mendez", "Gilbert", "Jensen", "Williamson", "Montgomery", "Harvey", "Oliver", "Howell", "Dean", "Hanson", "Weber", "Garrett", "Sims", "Burton", "Fuller", "Soto", "Mccoy", "Welch", "Chen", "Schultz", "Walters", "Reid", "Fields", "Walsh", "Little", "Fowler", "Bowman", "Davidson", "May", "Day", "Schneider", "Newman", "Brewer", "Lucas", "Holland", "Wong", "Banks", "Santos", "Curtis", "Pearson", "Delgado", "Valdez", "Pena", "Rios", "Douglas", "Sandoval", "Barrett", "Hopkins", "Keller", "Guerrero", "Stanley", "Bates", "Alvarado", "Beck", "Ortega", "Wade", "Estrada", "Contreras", "Barnett", "Caldwell", "Santiago", "Lambert", "Powers", "Chambers", "Nunez", "Craig", "Leonard", "Lowe", "Rhodes", "Byrd", "Gregory", "Shelton", "Frazier", "Becker", "Maldonado", "Fleming", "Vega", "Sutton", "Cohen", "Jennings", "Parks", "Mcdaniel", "Watts", "Barker", "Norris", "Vaughn", "Vazquez", "Holt", "Schwartz", "Steele", "Benson", "Neal", "Dominguez", "Horton", "Terry", "Wolfe", "Hale", "Lyons", "Graves", "Haynes", "Miles", "Park", "Warner", "Padilla", "Bush", "Thornton", "Mccarthy", "Mann", "Zimmerman", "Erickson", "Fletcher", "Mckinney", "Page", "Dawson", "Joseph", "Marquez", "Reeves", "Klein", "Espinoza", "Baldwin", "Moran", "Love", "Robbins", "Higgins", "Ball", "Cortez", "Le", "Griffith", "Bowen", "Sharp", "Cummings", "Ramsey", "Hardy", "Swanson", "Barber", "Acosta", "Luna", "Chandler", "Blair", "Daniel", "Cross", "Simon", "Dennis", "Oconnor", "Quinn", "Gross", "Navarro", "Moss", "Fitzgerald", "Doyle", "Mclaughlin", "Rojas", "Rodgers", "Stevenson", "Singh", "Yang", "Figueroa", "Harmon", "Newton", "Paul", "Manning", "Garner", "Mcgee", "Reese", "Francis", "Burgess", "Adkins", "Goodman", "Curry", "Brady", "Christensen", "Potter", "Walton", "Goodwin", "Mullins", "Molina", "Webster", "Fischer", "Campos", "Avila", "Sherman", "Todd", "Chang", "Blake", "Malone", "Wolf", "Hodges", "Juarez", "Gill", "Farmer", "Hines", "Gallagher", "Duran", "Hubbard", "Cannon", "Miranda", "Wang", "Saunders", "Tate", "Mack", "Hammond", "Carrillo", "Townsend", "Wise", "Ingram", "Barton", "Mejia", "Ayala", "Schroeder", "Hampton", "Rowe", "Parsons", "Frank", "Waters", "Strickland", "Osborne", "Maxwell", "Chan", "Deleon", "Norman", "Harrington", "Casey", "Patton", "Logan", "Bowers", "Mueller", "Glover", "Floyd", "Hartman", "Buchanan", "Cobb", "French", "Kramer", "Mccormick", "Clarke", "Tyler", "Gibbs", "Moody", "Conner", "Sparks", "Mcguire", "Leon", "Bauer", "Norton", "Pope", "Flynn", "Hogan", "Robles", "Salinas", "Yates", "Lindsey", "Lloyd", "Marsh", "Mcbride", "Owen", "Solis", "Pham", "Lang", "Pratt", "Lara", "Brock", "Ballard", "Trujillo", "Shaffer", "Drake", "Roman", "Aguirre", "Morton", "Stokes", "Lamb", "Pacheco", "Patrick", "Cochran", "Shepherd", "Cain", "Burnett", "Hess", "Li", "Cervantes", "Olsen", "Briggs", "Ochoa", "Cabrera", "Velasquez", "Montoya", "Roth", "Meyers", "Cardenas", "Fuentes", "Weiss", "Hoover", "Wilkins", "Nicholson", "Underwood", "Short", "Carson", "Morrow", "Colon", "Holloway", "Summers", "Bryan", "Petersen", "Mckenzie", "Serrano", "Wilcox", "Carey", "Clayton", "Poole", "Calderon", "Gallegos", "Greer", "Rivas", "Guerra", "Decker", "Collier", "Wall", "Whitaker", "Bass", "Flowers", "Davenport", "Conley", "Houston", "Huff", "Copeland", "Hood", "Monroe", "Massey", "Roberson", "Combs", "Franco", "Larsen", "Pittman", "Randall", "Skinner", "Wilkinson", "Kirby", "Cameron", "Bridges", "Anthony", "Richard", "Kirk", "Bruce", "Singleton", "Mathis", "Bradford", "Boone", "Abbott", "Charles", "Allison", "Sweeney", "Atkinson", "Horn", "Jefferson", "Rosales", "York", "Christian", "Phelps", "Farrell", "Castaneda", "Nash", "Dickerson", "Bond", "Wyatt", "Foley", "Chase", "Gates", "Vincent", "Mathews", "Hodge", "Garrison", "Trevino", "Villarreal", "Heath", "Dalton", "Valencia", "Callahan", "Hensley", "Atkins", "Huffman", "Roy", "Boyer", "Shields", "Lin", "Hancock", "Grimes", "Glenn", "Cline", "Delacruz", "Camacho", "Dillon", "Parrish", "Oneill", "Melton", "Booth", "Kane", "Berg", "Harrell", "Pitts", "Savage", "Wiggins", "Brennan", "Salas", "Marks", "Russo", "Sawyer", "Baxter", "Golden", "Hutchinson", "Liu", "Walter", "Mcdowell", "Wiley", "Rich", "Humphrey", "Johns", "Koch", "Suarez", "Hobbs", "Beard", "Gilmore", "Ibarra", "Keith", "Macias", "Khan", "Andrade", "Ware", "Stephenson", "Henson", "Wilkerson", "Dyer", "Mcclure", "Blackwell", "Mercado", "Tanner", "Eaton", "Clay", "Barron", "Beasley", "Oneal", "Preston", "Small", "Wu", "Zamora", "Macdonald", "Vance", "Snow", "Mcclain", "Stafford", "Orozco", "Barry", "English", "Shannon", "Kline", "Jacobson", "Woodard", "Huang", "Kemp", "Mosley", "Prince", "Merritt", "Hurst", "Villanueva", "Roach", "Nolan", "Lam", "Yoder", "Mccullough", "Lester", "Santana", "Valenzuela", "Winters", "Barrera", "Leach", "Orr", "Berger", "Mckee", "Strong", "Conway", "Stein", "Whitehead", "Bullock", "Escobar", "Knox", "Meadows", "Solomon", "Velez", "Odonnell", "Kerr", "Stout", "Blankenship", "Browning", "Kent", "Lozano", "Bartlett", "Pruitt", "Buck", "Barr", "Gaines", "Durham", "Gentry", "Mcintyre", "Sloan", "Rocha", "Melendez", "Herman", "Sexton", "Moon", "Hendricks", "Rangel", "Stark", "Lowery", "Hardin", "Hull", "Sellers", "Ellison", "Calhoun", "Gillespie", "Mora", "Knapp", "Mccall", "Morse", "Dorsey", "Weeks", "Nielsen", "Livingston", "Leblanc", "Mclean", "Bradshaw", "Glass", "Middleton", "Buckley", "Schaefer", "Frost", "Howe", "House", "Mcintosh", "Ho", "Pennington", "Reilly", "Hebert", "Mcfarland", "Hickman", "Noble", "Spears", "Conrad", "Arias", "Galvan", "Velazquez", "Huynh", "Frederick", "Randolph", "Cantu", "Fitzpatrick", "Mahoney", "Peck", "Villa", "Michael", "Donovan", "Mcconnell", "Walls", "Boyle", "Mayer", "Zuniga", "Giles", "Pineda", "Pace", "Hurley", "Mays", "Mcmillan", "Crosby", "Ayers", "Case", "Bentley", "Shepard", "Everett", "Pugh", "David", "Mcmahon", "Dunlap", "Bender", "Hahn", "Harding", "Acevedo", "Raymond", "Blackburn", "Duffy", "Landry", "Dougherty", "Bautista", "Shah", "Potts", "Arroyo", "Valentine", "Meza", "Gould", "Vaughan", "Fry", "Rush", "Avery", "Herring", "Dodson", "Clements", "Sampson", "Tapia", "Bean", "Lynn", "Crane", "Farley", "Cisneros", "Benton", "Ashley", "Mckay", "Finley", "Best", "Blevins", "Friedman", "Moses", "Sosa", "Blanchard", "Huber", "Frye", "Krueger", "Bernard", "Rosario", "Rubio", "Mullen", "Benjamin", "Haley", "Chung", "Moyer", "Choi", "Horne", "Yu", "Woodward", "Ali", "Nixon", "Hayden", "Rivers", "Estes", "Mccarty", "Richmond", "Stuart", "Maynard", "Brandt", "Oconnell", "Hanna", "Sanford", "Sheppard", "Church", "Burch", "Levy", "Rasmussen", "Coffey", "Ponce", "Faulkner", "Donaldson", "Schmitt", "Novak", "Costa", "Montes", "Booker", "Cordova", "Waller", "Arellano", "Maddox", "Mata", "Bonilla", "Stanton", "Compton", "Kaufman", "Dudley", "Mcpherson", "Beltran", "Dickson", "Mccann", "Villegas", "Proctor", "Hester", "Cantrell", "Daugherty", "Cherry", "Bray", "Davila", "Rowland", "Levine", "Madden", "Spence", "Good", "Irwin", "Werner", "Krause", "Petty", "Whitney", "Baird", "Hooper", "Pollard", "Zavala", "Jarvis", "Holden", "Haas", "Hendrix", "Mcgrath", "Bird", "Lucero", "Terrell", "Riggs", "Joyce", "Mercer", "Rollins", "Galloway", "Duke", "Odom", "Andersen", "Downs", "Hatfield", "Benitez", "Archer", "Huerta", "Travis", "Mcneil", "Hinton", "Zhang", "Hays", "Mayo", "Fritz", "Branch", "Mooney", "Ewing", "Ritter", "Esparza", "Frey", "Braun", "Gay", "Riddle", "Haney", "Kaiser", "Holder", "Chaney", "Mcknight", "Gamble", "Vang", "Cooley", "Carney", "Cowan", "Forbes", "Ferrell", "Davies", "Barajas", "Shea", "Osborn", "Bright", "Cuevas", "Bolton", "Murillo", "Lutz", "Duarte", "Kidd", "Key", "Cooke"]
  const defaultUsedNames = new Array<string>()

  const generatePlayers = (position: string, amount: number) => {
    var generatedPlayers = new Array<Player>()
    for(var i = 0; i < amount; i++){
      var name = null
      var attributes = null
      var contract = null
      while(true){
        name = firstNames[Math.floor(Math.random() * 1000)] + " " + lastNames[Math.floor(Math.random() * 1000)]
        if(!defaultUsedNames.includes(name)){
            defaultUsedNames.push(name)
            break
        }
      }
      switch (position){
        case "QB":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 20, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 20, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 40)
        case "WR":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 25, Math.floor(Math.random() * 11) + 25, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 45, Math.floor(Math.random() * 11) + 45)
        case "RB":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 20, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 50)
        case "TE":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 50)
        case "OL":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 10, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 50)
        case "DL":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 10, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 50)
        case "LB":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 25, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 35, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 45, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 55, Math.floor(Math.random() * 11) + 50)
        case "CB":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 25, Math.floor(Math.random() * 11) + 25, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 60, Math.floor(Math.random() * 11) + 45, Math.floor(Math.random() * 11) + 45)
        case "S":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 35, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 25, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 55, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 45)
        case "K":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 45, Math.floor(Math.random() * 11) + 20, Math.floor(Math.random() * 11) + 35, Math.floor(Math.random() * 11) + 20, Math.floor(Math.random() * 11) + 65, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 55, Math.floor(Math.random() * 11) + 40)
        case "P":
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 20, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 20, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 40, Math.floor(Math.random() * 11) + 70, Math.floor(Math.random() * 11) + 40)
        default:
          attributes = new Attributes(Math.floor(Math.random() * 10) + 20, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 30, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 50, Math.floor(Math.random() * 11) + 50)
      }
      var rawSalary = 1000000 * 1.035 ** attributes.overall
      if(position == "QB"){
        rawSalary *= 2
      }
      if(position == "K"){
        rawSalary /= 3
      }
      if(position == "P"){
        rawSalary /= 5
      }
      const randomFactor = (Math.random() * 10) + 1
      if(randomFactor > 5){
        rawSalary *= 1 + (randomFactor - 5) / 20
      }
      else{
        rawSalary *= 1 - randomFactor / 20
      }
      const years = (Math.random() * 5) + 1
      contract = new Contract(Math.round(rawSalary / 10000) * 10000, years, 2024 + years)
      generatedPlayers.push(new Player(name, position, contract, attributes))
    }
    return generatedPlayers.sort((a, b) => b.attributes.overall - a.attributes.overall)
  }

  const defaultRoster: Map<string, Player[]> = new Map([
      ["QB", generatePlayers("QB", 2)],
      ["WR", generatePlayers("WR", 4)],
      ["RB", generatePlayers("RB", 3)],
      ["TE", generatePlayers("TE", 2)],
      ["OL", generatePlayers("OL", 9)],
      ["DL", generatePlayers("DL", 7)],
      ["LB", generatePlayers("LB", 6)],
      ["CB", generatePlayers("CB", 4)],
      ["S", generatePlayers("S", 4)],
      ["K", generatePlayers("K", 2)],
      ["P", generatePlayers("P", 2)]
  ])

  const defaultStarters: Map<string, Player[]> = new Map([
      ["QB", [...defaultRoster.get("QB")!].slice(0, 1)],
      ["WR", [...defaultRoster.get("QB")!].slice(0, 2)],
      ["RB", [...defaultRoster.get("QB")!].slice(0, 1)],
      ["TE", [...defaultRoster.get("QB")!].slice(0, 1)],
      ["OL", [...defaultRoster.get("QB")!].slice(0, 6)],
      ["DL", [...defaultRoster.get("QB")!].slice(0, 4)],
      ["LB", [...defaultRoster.get("QB")!].slice(0, 3)],
      ["CB", [...defaultRoster.get("QB")!].slice(0, 2)],
      ["S", [...defaultRoster.get("QB")!].slice(0, 2)],
      ["K", [...defaultRoster.get("QB")!].slice(0, 1)],
      ["P", [...defaultRoster.get("QB")!].slice(0, 1)]
  ])

  useEffect(() => {
    const loadSaves = async () => {
      try {
        const docRef = doc(firestore, "users", user!.uid)
        const docSnap = await getDoc(docRef)
  
        if (docSnap.exists()) {
          setSaves(docSnap.data().saves.length)
        }
      } catch (err) {
        console.error("Error fetching document: ", err)
      }
    }
    if(user){
      loadSaves()
    }
  }, [firestore, user])

  if(user){
    return(
      <AppProvider>
        <main>
          <Navbar/>
          <div>
            <input 
              placeholder="Save Name" 
              value={saveName} 
              onChange={(e) => setSaveName(e.target.value)} 
              className="w-32 p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            />
            <button className="bg-blue-500" onClick={setSavesDocument}>New Save</button>
          </div>
        </main>
      </AppProvider>
    )
  }
  else{
    return (
      <AppProvider>
        <main>
          <Navbar/>
          <h1>Welcome</h1>
        </main>
      </AppProvider>
    )
  }
}