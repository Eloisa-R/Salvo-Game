package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api")
public class SalvoController {

    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private GamePlayerRepository gamePlayerRepository;
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private SalvoRepository salvoRepository;

    public SalvoController() {}

    private Map<String, Object> GameToDTO(Game game){
        Map<String, Object> gameInfo = new LinkedHashMap<>();
        gameInfo.put("id", game.getId());
        gameInfo.put("created", game.getCreationDate());
        gameInfo.put("gamePlayers", getGamePlayers(game));
        return gameInfo;
    }

    private Map<String, Object> playerToDTO(Player player){
        Map<String, Object> playerInfo = new LinkedHashMap<>();
        playerInfo.put("id", player.getId());
        playerInfo.put("email", player.getUserName());
        return playerInfo;
    }

    private Map<String, Object> gamePlayerToDTO(GamePlayer gamePlayer){
        Map<String, Object> gamePlayerInfo = new LinkedHashMap<>();
        gamePlayerInfo.put("id", gamePlayer.getId());
        gamePlayerInfo.put("score", getScoreforGamePlayer(gamePlayer));
        gamePlayerInfo.put("player", playerToDTO(gamePlayer.getGamePlayer()));
        return gamePlayerInfo;
    }

    private List<Map> getGamePlayers(Game game){
        Set<GamePlayer> gamePlayers = game.getGameplays();
        return gamePlayers.stream()
                .map(gp -> gamePlayerToDTO(gp))
                .collect(toList());
    }

    private Map<String, Object> getSalvoes(GamePlayer gamePlayer){
        Map<String, Object> SalvoesInfo = new LinkedHashMap<>();
        Set<Salvo> salvoes = gamePlayer.getSalvoes();
        for (Salvo salvoItem: salvoes) {
            SalvoesInfo.put(String.valueOf(salvoItem.getTurnNumber()), salvoItem.getSalvoLocations());
        }
        return SalvoesInfo;
    }

    private Map<String, Object> getSalvoesforAll(Set<GamePlayer> gps) {
        Map<String, Object> AllSalvoesInfo = new LinkedHashMap<>();
        for (GamePlayer gp: gps) {
           AllSalvoesInfo.put(String.valueOf(gp.getId()), getSalvoes(gp));
        }
        return AllSalvoesInfo;
    }

    private Optional<Double> getScoreforGamePlayer(GamePlayer gp) {
        Optional<Double> score = gp.getGameEntry().getScores().stream()
                .filter(sc -> sc.getPlayer().equals(gp.getGamePlayer()))
                .map(sc -> sc.getScorePoints())
                .findFirst();
        return score;
    }

    private Map<String, Object> getScoreforPlayer(Player player){
        Map<String, Object> ScoreInfo = new LinkedHashMap<>();
        ScoreInfo.put("id", player.getId());
        ScoreInfo.put("email", player.getUserName());
        ScoreInfo.put("total", player.getScores().stream().mapToDouble(sc -> sc.getScorePoints()).sum());
        ScoreInfo.put("wins", player.getScores().stream().filter(sc -> sc.getScorePoints() == 1.0).count());
        ScoreInfo.put("losses", player.getScores().stream().filter(sc -> sc.getScorePoints() == 0.0).count());
        ScoreInfo.put("ties", player.getScores().stream().filter(sc -> sc.getScorePoints() == 0.5).count());
        return ScoreInfo;
    }

    private Map<String, Map<Ship.ShipType,Integer>> getHitsOnOpponent(GamePlayer playerGP, GamePlayer oponentGP){
        Map<String, Map<Ship.ShipType,Integer>> salvoesShipMap = new HashMap<>();
        if (oponentGP == null) {
            return salvoesShipMap;
        } else {
            Set<Ship> oponentShips = oponentGP.getShips();
            Set<Salvo> playerSalvoes = playerGP.getSalvoes();

            for (Salvo salvo: playerSalvoes) {
                Map<Ship.ShipType, Integer> allShipsData = new HashMap<>();
                for (Ship ship: oponentShips) {
                    List<String> common = new ArrayList<>(ship.getLocations());
                    common.retainAll(salvo.getSalvoLocations());
                    allShipsData.put(ship.getType(), common.size());

                }
                salvoesShipMap.put(String.valueOf(salvo.getTurnNumber()),allShipsData);
            }


            return salvoesShipMap;
        }

    }

    private Map<Ship.ShipType, Object> getSunkenShipsOponent(GamePlayer oponentGP,  Map<String, Map<Ship.ShipType,Integer>> hitsMap){
        Map<Ship.ShipType, Object> sunkenShipsMap = new HashMap<>();
        Map<Ship.ShipType, Integer> ShipTypeLimit= new HashMap<>();
        ShipTypeLimit.put(Ship.ShipType.AIRCRAFT_CARRIER, 5);
        ShipTypeLimit.put(Ship.ShipType.BATTLESHIP,4);
        ShipTypeLimit.put(Ship.ShipType.SUBMARINE, 3);
        ShipTypeLimit.put(Ship.ShipType.DESTROYER, 3);
        ShipTypeLimit.put(Ship.ShipType.PATROL_BOAT, 2);

        Map<Ship.ShipType, Integer> ShipTypeCounter= new HashMap<>();
        ShipTypeCounter.put(Ship.ShipType.AIRCRAFT_CARRIER, 0);
        ShipTypeCounter.put(Ship.ShipType.BATTLESHIP,0);
        ShipTypeCounter.put(Ship.ShipType.SUBMARINE, 0);
        ShipTypeCounter.put(Ship.ShipType.DESTROYER, 0);
        ShipTypeCounter.put(Ship.ShipType.PATROL_BOAT, 0);

        if (oponentGP == null) {
            return sunkenShipsMap;
        } else {

            for (String key: hitsMap.keySet()) {
                Map<Ship.ShipType, Integer> shipMap = hitsMap.get(key);
                for (Ship.ShipType shipKey: shipMap.keySet()) {
                    ShipTypeCounter.put(shipKey, ShipTypeCounter.get(shipKey) + shipMap.get(shipKey));
                    if (ShipTypeCounter.get(shipKey).equals(ShipTypeLimit.get(shipKey))) {
                        sunkenShipsMap.put(shipKey, key);
                    }
                }
            }

            return sunkenShipsMap;
        }

    }

    private Map<String, Object> makeMap(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }

    @GetMapping("/games")
    public Map<String, Object> getGames(Authentication authentication){

        Map<String, Object> reponse = new LinkedHashMap<>();
        Map<String, Object> playerInfo = new LinkedHashMap<>();
        if (authentication == null) {
            playerInfo. put("id", "null");
            playerInfo. put("username", "null");
        } else {
            playerInfo. put("id", playerRepository.findByUserName(authentication.getName()).getId());
            playerInfo. put("username", playerRepository.findByUserName(authentication.getName()).getUserName());
        }
        reponse.put("player", playerInfo);


        List<Map> gameList = gameRepository.findAll().stream()
               .map(game -> GameToDTO(game))
               .collect(toList());
        reponse.put("games", gameList);

        return reponse;
    }

    @RequestMapping(
            value = "/games",
            method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> createGame(Authentication authentication){
        if (authentication == null) {
            return new ResponseEntity<>(makeMap("error", "Login required"), HttpStatus.UNAUTHORIZED);
        } else {
            Player loggedUser = playerRepository.findByUserName(authentication.getName());
            Game newGame = new Game();
            gameRepository.save(newGame);
            GamePlayer newGP = new GamePlayer(newGame, loggedUser);
            gamePlayerRepository.save(newGP);
            return new ResponseEntity<>(makeMap("gpid", newGP.getId()), HttpStatus.CREATED);
        }
    }

    @RequestMapping(
            value = "/games/{gameID}/players",
            method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> joinGame(Authentication authentication, @PathVariable long gameID){
        Game getGame = gameRepository.findById(gameID);

        if (authentication == null) {
            return new ResponseEntity<>(makeMap("error", "Login required"), HttpStatus.UNAUTHORIZED);
        } else if (getGame == null) {
            return new ResponseEntity<>(makeMap("error", "Game doesn't exist"), HttpStatus.FORBIDDEN);
        } else if (getGame.getGameplays().size() > 1) {
            return new ResponseEntity<>(makeMap("error", "Game is full"), HttpStatus.FORBIDDEN);
        } else {
            Player loggedUser = playerRepository.findByUserName(authentication.getName());
            GamePlayer newGp = new GamePlayer(getGame, loggedUser);
            gamePlayerRepository.save(newGp);
            return new ResponseEntity<>(makeMap("gpid", newGp.getId()), HttpStatus.CREATED);
        }
    }


    @RequestMapping(
            value = "/games/players/{gamePlayerId}/ships",
            method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> placeShips(Authentication authentication, @RequestBody List<Ship> shipList, @PathVariable long gamePlayerId){
            GamePlayer selectedGP = gamePlayerRepository.findById(gamePlayerId);
            if (authentication == null) {
                return new ResponseEntity<>(makeMap("error", "Login required"), HttpStatus.UNAUTHORIZED);
            } else if (selectedGP == null) {
                return new ResponseEntity<>(makeMap("error", "Game Player ID doesn't exist"), HttpStatus.UNAUTHORIZED);
            } else if (selectedGP.getGamePlayer().getId() != playerRepository.findByUserName(authentication.getName()).getId()) {
                return new ResponseEntity<>(makeMap("error", "Incorrect user for this Game Player"), HttpStatus.UNAUTHORIZED);
            } else if (selectedGP.getShips().size() > 0) {
                return new ResponseEntity<>(makeMap("error", "Ships are already placed for this Game Player"), HttpStatus.FORBIDDEN);
            } else {
                for (Ship ship: shipList) {

                    selectedGP.addShip(ship);
                    shipRepository.save(ship);
                }
                return new ResponseEntity<>(makeMap("success", "ships added successfully"), HttpStatus.CREATED);
            }
    }

    @RequestMapping(
            value="/games/players/{gamePlayerId}/salvoes",
            method = RequestMethod.POST)
    public ResponseEntity<Map <String, Object>> fireSalvoes(Authentication authentication, @RequestBody Map<Integer,List<String>> salvoesObj, @PathVariable long gamePlayerId){
        GamePlayer selectedGP = gamePlayerRepository.findById(gamePlayerId);
        Set<Salvo> sGPSalvoes = selectedGP.getSalvoes();
        Integer turnTaken = salvoesObj.keySet().stream().findFirst().get();
        List<String> locationsFired = salvoesObj.get(turnTaken);
        Boolean turnAlreadyTaken =false;
        for (Salvo s: sGPSalvoes) {
            turnAlreadyTaken = turnTaken == s.getTurnNumber()? true:false;
            }
        if (authentication == null) {
            return new ResponseEntity<>(makeMap("error", "Login required"), HttpStatus.UNAUTHORIZED);
        } else if (selectedGP == null) {
            return new ResponseEntity<>(makeMap("error", "Game Player ID doesn't exist"), HttpStatus.UNAUTHORIZED);
        } else if (selectedGP.getGamePlayer().getId() != playerRepository.findByUserName(authentication.getName()).getId()) {
            return new ResponseEntity<>(makeMap("error", "Incorrect user for this Game Player"), HttpStatus.UNAUTHORIZED);
        } else if (turnAlreadyTaken) {
            return new ResponseEntity<>(makeMap("error", "You've already fired salvoes this turn"), HttpStatus.FORBIDDEN);
        } else {
            Salvo newSalvo = new Salvo(selectedGP, turnTaken, locationsFired);
            salvoRepository.save(newSalvo);
            return new ResponseEntity<>(makeMap("success", "Salvo correctly saved"), HttpStatus.CREATED);
        }

    }


    @GetMapping("/game_view/{gamePlayerId}")
    public ResponseEntity<Map<String,Object>> getGameByGamePlayer(@PathVariable long gamePlayerId, Authentication authentication) {

        List<Long> gPperUser = playerRepository.findByUserName(authentication.getName()).getGameplayers()
                                                                                            .stream()
                                                                                            .map(gp -> gp.getId())
                                                                                            .collect(toList());

        if (gPperUser.contains(gamePlayerId)) {
            Optional<GamePlayer> selectedGP = gamePlayerRepository.findAll().stream()
                    .filter(gp -> gp.getId() == gamePlayerId)
                    .findAny();
            Set<GamePlayer> gamePlayers;
            if (selectedGP.isPresent()){
                gamePlayers = selectedGP.get().getGameEntry().getGameplays();
            } else {
                return new ResponseEntity<>(makeMap("error", "Game Player ID doesn't exist"), HttpStatus.UNAUTHORIZED);
            }

            GamePlayer oponentGP = null;
            for (GamePlayer gp : gamePlayers) {
                if (!gp.equals(selectedGP.get())) {
                    oponentGP = gp;
                }
            }

            Map<String, Object> gamePlayerdata = GameToDTO(selectedGP.get().getGameEntry());
            gamePlayerdata.put("ships", selectedGP.get().getShips());
            gamePlayerdata.put("salvoes", getSalvoesforAll(gamePlayers));
            gamePlayerdata.put( "successful_hits",getHitsOnOpponent(selectedGP.get(), oponentGP));
            gamePlayerdata.put("oponent_sunken_ships", getSunkenShipsOponent(selectedGP.get(), getHitsOnOpponent(selectedGP.get(), oponentGP)));

            return new ResponseEntity<>(gamePlayerdata, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(makeMap("error", "Login required"), HttpStatus.UNAUTHORIZED);
        }

    }


    @GetMapping("/scores")
    public List<Map> getPlayers(){
        return playerRepository.findAll().stream()
                .map(pl -> getScoreforPlayer(pl))
                .collect(toList());
    }


    @GetMapping("/players")
    public List<Player> allPlayers() {
        return playerRepository.findAll();
    }


    @RequestMapping(
            value = "/players",
            method = RequestMethod.POST)
    public ResponseEntity<String> createNewPlayer(@RequestBody String username_info) {
        String decodedParams = URLDecoder.decode(username_info);
        String[] parts = decodedParams.split("&");
        Map<String, String> paramDict = new HashMap<>();
        for (String element : parts) {
            String[] elementSplit = element.split("=");
            paramDict.put(elementSplit[0], elementSplit[1]);
        }
        if(paramDict.get("firstname") == "" || paramDict.get("lastname") == "" || paramDict.get("username") == "" || paramDict.get("password") == "") {
            return new ResponseEntity<>("Missing data for player", HttpStatus.FORBIDDEN);
        } else if(playerRepository.findByUserName(paramDict.get("username")) != null){
            return new ResponseEntity<>("Email is already in use", HttpStatus.FORBIDDEN);
        } else {
            playerRepository.save(new Player(paramDict.get("firstname"), paramDict.get("lastname"), paramDict.get("username"), paramDict.get("password")));
            return new ResponseEntity<>("Player created successfully", HttpStatus.CREATED);
        }

    }


}
