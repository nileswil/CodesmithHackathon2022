// create a fetch request to grab ALL of the pokemon and store data in an array;

const listOfFirst150Pokemon = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran-f","nidorina","nidoqueen","nidoran-m","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetchd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr-mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew"];
const randomNumber = function (min, max) { // pokemon URLs start with 1 and end with 151
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const requestForAllPokemon = new Request (`https://pokeapi.co/api/v2/pokemon/${randomNumber(1, 152)}`);
fetch(requestForAllPokemon).then((data) => data.json())
  .then((data) => {
    // let's create an array of random pokemon answers for our game
    // lines 15-22 creates 3 other random unique pokemon names from our original list, without modifying the original list.
    const pokemonAnswers = [data.name];
    const newList = listOfFirst150Pokemon.slice();
    newList.splice(listOfFirst150Pokemon.indexOf(data.name),1)
      for (let i = 1; i < 4; i++) {
        let removeElement = newList[randomNumber(1,152-i)];
        pokemonAnswers.push(removeElement);
        newList.splice(listOfFirst150Pokemon.indexOf(removeElement),1)
      }
    pokemonAnswers.sort((a,b) => a.localeCompare(b)); // random answer choices of pokemon. I used a sort method but it's "random" since
    // the pokemon are shuffled by a sort algorithm but the user won't know it's sorted since they're checking for a name, not a number.
    console.log(pokemonAnswers)
    console.log(data.name)

  })
  .catch(error => console.log('Error'))

//DOM MANIP


//*******GAME CREATION
//GAME CONTAINER
const gameContainer = document.createElement('div');
gameContainer.className = 'game-container';
gameContainer.setAttribute('id', 'game-Container');

//IMAGE CONTAINER
const imgContainer = document.createElement('div');
imgContainer.className = 'img-container';
imgContainer.setAttribute('id', 'img-Container');

//POKEMON IMAGE
const pokemonInstance = document.createElement('img');
pokemonInstance.className = 'pokemon-instance';
pokemonInstance.setAttribute('id', 'pokemon-Instance');
pokemonInstance.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
pokemonInstance.setAttribute('style', 'filter: brightness(0%)');
//append pokemon into our image container ^
imgContainer.append(pokemonInstance);

//GAME BUTTONS
//button that makes pokemon appear.
const appearButton = document.createElement('button');
appearButton.className = 'appear-button';
appearButton.setAttribute('id', 'appear-Button');
appearButton.innerText = 'Click Me';
appearButton.addEventListener('click', () => {
  pokemonInstance.setAttribute('style', 'filter: brightness(100%)')
});


//append all sub items to our game Container
gameContainer.append(imgContainer, appearButton);

//*******END GAME CREATION
//insert our game container into the DOM.
//FAKE MOCK UP
const body = document.querySelector('body');
body.append(gameContainer);

//REAL EXTENSION INSERTION: select main, save info. remove info from DOM. insert our Game;
// const googleTarget = document.querySelector('#main');
// const saved = googleTarget.innerHTML;
// googleTarget.innerText = '';
// googleTarget.append(gameContainer);
//TO BRING BACK GOOGLE STUFF
//googleTarget.innerHTML = saved;




/*
TO-DO

1. [*]finish API calling
2. [x] get a basic CSS for our images
3. [*]build a set up to load into our DOM (the elements)
4. [*] Extension loaded up and working. (proper targeting of google page for DOM manip)
5. guessing functionality (input field with submit)
6. WIN/LOSS display
7. reload ability to play again.
8. put matt/reid picture in our images. maybe team rocket. + charlie as meoff

BONUS
0. Buttons as answers
1. score counter
2. make css nicer, animations etc.
3. toggle game on and off from popup? ie. click on a pokeball????
4. play whos that pokemon!
*/
