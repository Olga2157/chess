export default class ChangePlayersService {

  public static changeActivePlayerImg(){
    const playersInformation = document.querySelectorAll(".img-active-wrapper");
    playersInformation.forEach((elem)=> {
      if (elem.classList.contains("invisible")) {
        elem.classList.remove("invisible");
      } else {
        elem.classList.add("invisible");
      }
    })
}
}
