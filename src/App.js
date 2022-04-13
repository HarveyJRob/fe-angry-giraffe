// Stylesheets
import "./App.css";

// React Imports
import { useEffect, useState } from "react";

// Components
import { DropDown } from "./components/DropDown";

// Firebase Imports
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Firestore,
} from "firebase/firestore";
import { result } from "lodash";

// Firebase Config Options
const firebaseConfig = {
  apiKey: "AIzaSyC-W5yO5zY1JnJWKaycfNM0dN9qLeaAomw",
  authDomain: "plan-it-scran-it.firebaseapp.com",
  projectId: "plan-it-scran-it",
  storageBucket: "plan-it-scran-it.appspot.com",
  messagingSenderId: "799473644223",
  appId: "1:799473644223:web:335c587e4f83b7ce21cc0a",
  measurementId: "G-06L4EXEFE6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [families, setFamilies] = useState([]);
  const [familyId, setFamilyId] = useState();
  const [scranPlans, setScranPlans] = useState([]);
  const [scranPlanId, setScranPlanId] = useState();
  const [scranPlan, setScranPlan] = useState();
  const [recipes, setRecipes] = useState();
  const [shortListId, setShortListId] = useState();
  const [shortListRecipeIds, setShortListRecipeIds] = useState([]);
  const [shortListConfs, setShortListConfs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const people = [];
        querySnapshot.forEach((doc) => {
          const result = {};
          result.id = doc.id;
          result.name = doc.get("name");
          people.push(result);
        });
        setUsers(people);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const q = query(
        collection(db, "families"),
        where("familyMembers", "array-contains", user),
        where("isActive", "==", true)
      );
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const families = [];
          querySnapshot.forEach((doc) => {
            const result = {};
            result.id = doc.id;
            result.name = doc.get("name");
            result.members = doc.get("familyMembers");
            families.push(result);
          });
          setFamilies(families);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user && familyId) {
      setIsLoading(true);
      const q = query(collection(db, `families/${familyId}/scranPlan`));
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const plans = [];
          querySnapshot.forEach((doc) => {
            const result = {};
            result.id = doc.id;
            result.name = doc.get("name");
            plans.push(result);
          });
          setScranPlans(plans);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [user, familyId]);

  useEffect(() => {
    if (user && familyId && scranPlanId) {
      setIsLoading(true);
      const unsubscribe = onSnapshot(
        doc(db, `families/${familyId}/scranPlan`, scranPlanId),
        (snap) => {
          setScranPlan({ ...snap.data() });
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [user, familyId, scranPlanId]);

  useEffect(() => {
    if (scranPlan) {
      setIsLoading(true);
      const q = query(collection(db, "recipes"), where("id", "in", scranPlan.selectionList));
      getDocs(q).then((querySnapshot) => {
        result = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });
        setRecipes(result);
        setIsLoading(false);
      });
    }
  }, [scranPlan]);

  useEffect(() => {
    if (user && familyId && scranPlanId) {
      setIsLoading(true);
      const q = query(collection(db, `families/${familyId}/scranPlan/${scranPlanId}/shortLists`));
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const confirmations = [];
          querySnapshot.forEach((doc) => {
            if (doc.get("userId") === user) {
              setShortListId(doc.id);
              setShortListRecipeIds(doc.get("recipeIds"));
            }
            const result = {};
            result.userId = doc.get("userId");
            result.isConfirmed = doc.get("isConfirmed");
            confirmations.push(result);
          });
          setShortListConfs(confirmations);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [user, familyId, scranPlanId]);

  // useEffect(() => {
  //   if (user && familyId && scranPlanId) {
  //     setIsLoading(true);
  //     const q = query(
  //       collection(db, `families/${familyId}/scranPlan/${scranPlanId}/shortLists`),
  //       where("userId", "==", user)
  //     );
  //     const unsubscribe = onSnapshot(
  //       q,
  //       (querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           setShortListId(doc.id);
  //           setShortListRecipeIds(doc.get("recipeIds"));
  //         });
  //         setIsLoading(false);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //     return () => unsubscribe();
  //   }
  // }, [user, familyId, scranPlanId]);

  let handleUserChange = (e) => {
    setUser(e.target.value);
    setFamilyId();
    setScranPlanId();
    console.log(e.target.value);
  };

  let handleFamilyChange = (e) => {
    setFamilyId(e.target.value);
    setScranPlanId();
    console.log(e.target.value);
  };

  let handlePlanChange = (e) => {
    setScranPlanId(e.target.value);
    console.log(e.target.value);
  };

  let handleShortList = (recipe_id) => {
    const docRef = doc(db, `families/${familyId}/scranPlan/${scranPlanId}/shortLists`, shortListId);

    if (shortListRecipeIds.includes(recipe_id)) {
      updateDoc(docRef, {
        recipeIds: arrayRemove(recipe_id),
      });
    } else {
      updateDoc(docRef, {
        recipeIds: arrayUnion(recipe_id),
      });
    }
  };

  if (isLoading) {
    return <p>....isLoading</p>;
  }

  if (user && familyId && scranPlanId && scranPlan && recipes && shortListRecipeIds) {
    return (
      <div className="App">
        <DropDown item={user} items={users} handleItemChange={handleUserChange} />
        <DropDown item={familyId} items={families} handleItemChange={handleFamilyChange} />
        <DropDown item={scranPlanId} items={scranPlans} handleItemChange={handlePlanChange} />

        <p>Scran Plan: {scranPlan.name}</p>
        <p>Start Date: {scranPlan.schedule.start.toDate().toString()}</p>
        <p>Plan Length: {scranPlan.schedule.length}</p>

        {families.map((family) => {
          if (family.id === familyId) {
            return (
              <ul key={family.id}>
                <li>Family: {family.name}</li>
              </ul>
            );
          }
          return null;
        })}
        <ol>
          {shortListConfs.map((person) => {
            return (
              <li key={person.userId}>
                {person.userId}: {person.isConfirmed.toString()}
              </li>
            );
          })}
        </ol>
        {recipes.map((recipe) => {
          return (
            <ul key={recipe.id}>
              <li>
                {recipe.id}: {recipe.title}
                <button
                  disabled={
                    !shortListRecipeIds.includes(recipe.id) && shortListRecipeIds.length >= scranPlan.schedule.length
                  }
                  onClick={() => handleShortList(recipe.id)}
                >
                  {shortListRecipeIds.includes(recipe.id) ? "remove" : "add"}
                </button>
              </li>
            </ul>
          );
        })}
      </div>
    );
  }

  if (user && familyId) {
    return (
      <div className="App">
        <DropDown item={user} items={users} handleItemChange={handleUserChange} />
        <DropDown item={familyId} items={families} handleItemChange={handleFamilyChange} />
        <DropDown item={scranPlanId} items={scranPlans} handleItemChange={handlePlanChange} />
      </div>
    );
  }

  if (user) {
    return (
      <div className="App">
        <DropDown item={user} items={users} handleItemChange={handleUserChange} />
        <DropDown item={familyId} items={families} handleItemChange={handleFamilyChange} />
      </div>
    );
  }

  return <DropDown item={user} items={users} handleItemChange={handleUserChange} />;
}

export default App;
