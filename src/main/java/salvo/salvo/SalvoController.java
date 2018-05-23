package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    private Map<String, Object> makeMap(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }

    @GetMapping("/games")
    public Map<String, Object> getGames(Authentication authentication){
        Map<String, Object> playerInfo = new LinkedHashMap<>();
        Map<String, Object> AllGamesInfoWAnt = new LinkedHashMap<>();

        if (authentication == null) {
            playerInfo. put("id", "null");
            playerInfo. put("username", "null");
        } else {
            playerInfo. put("id", playerRepository.findByUserName(authentication.getName()).getId());
            playerInfo. put("username", playerRepository.findByUserName(authentication.getName()).getUserName());
        }

        List<Map> gameList = gameRepository.findAll().stream()
               .map(game -> GameToDTO(game))
               .collect(toList());
        AllGamesInfoWAnt.put("player", playerInfo);
        AllGamesInfoWAnt.put("games", gameList);
        return AllGamesInfoWAnt;
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
            Set<GamePlayer> gamePlayers = selectedGP.get().getGameEntry().getGameplays();
            Map<String, Object> gamePlayerdata = GameToDTO(selectedGP.get().getGameEntry());
            gamePlayerdata.put("ships", selectedGP.get().getShips());
            gamePlayerdata.put("salvoes", getSalvoesforAll(gamePlayers));

            return new ResponseEntity<>(gamePlayerdata, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(makeMap("error", "Permission denied"), HttpStatus.UNAUTHORIZED);
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
