import firebaseConfig from "../config/firebase";
import {
    initializeApp
} from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
    addDoc,
    query,
    deleteDoc,
} from 'firebase/firestore';


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
async function getCards(db) {
    const cardsCol = collection(db, 'Cards');
    const cardSnapshot = await getDocs(cardsCol);
    const cardList = [];
    cardSnapshot.forEach((doc) => {
        let data = doc.data();
        data["id"] = doc.id;
        cardList.push(data);
    });
    return cardList;
}

async function getFollowingId(collectionName = "Cards") {
    var cards = await getCards(db);
    var followingId = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id >= (followingId)) {
            followingId = cards[i].id;
        };
    };
    followingId = Number(followingId) + 1;
    console.log(followingId);
    return followingId;
};
async function findNextId(db) {
    const cards = await getCards(db);
    cards.sort((a, b) => a.id - b.id); // Tri des cartes par ID
    let min = 0;
    let max = cards.length - 1;
    let mid;
    while (min <= max) {
        mid = Math.floor((min + max) / 2);
        if (cards[mid].id > mid) {
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }
    console.log(cards[mid].id + 1);
    return cards[mid].id + 1;
}


// Update a document in collection "Cards"
async function updateCard(db, title, content, tags, id = null) {
    if (id === null) {
        console.log("creation id");
        var id = await getFollowingId('Cards');
    };
    id = id.toString();
    console.log(id);
    console.log(title);
    // const washin= doc(db, "cities", "DC");
    // await setDoc(doc(collection(db, 'Cards'), id), {
    await setDoc(doc(db, 'Cards', id), {
        Title: title,
        Content: content,
        Tags: tags
    });
};
// Create a document in collection "Cards"
async function setCard(db, title, content, tags, id = null) {
    console.log("ASYNC FUNCTION UPDATE CARDS");
    if (id === null) {
        console.log("creation id");
        var id = await getFollowingId('Cards');
    };
    id = id.toString();
    console.log(id);
    console.log(title);
    // const washin= doc(db, "cities", "DC");
    await setDoc(doc(collection(db, 'Cards'), id), {
        Title: title,
        Content: content,
        Tags: tags
    });
};

async function deleteCard(db, id) {
    await deleteDoc(doc(db, "Cards", id));
}

const firebaseFunctions = {
    updateCard,
    getCards,
    setCard,
    deleteCard,
    db
}
export default firebaseFunctions;