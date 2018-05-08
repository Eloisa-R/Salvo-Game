package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/games")
    public List<Map> getGameIds(){
       return gameRepository.findAll().stream()
               .map(game -> GameToDTO(game))
               .collect(toList());
               }

    @GetMapping("/game_view/{gamePlayerId}")
    public Map<String, Object> getGameByGamePlayer(@PathVariable long gamePlayerId) {
        Optional<GamePlayer> selectedGP = gamePlayerRepository.findAll().stream()
                .filter(gp -> gp.getId() == gamePlayerId)
                .findAny();
        Set<GamePlayer> gamePlayers = selectedGP.get().getGameEntry().getGameplays();
        Map<String, Object> gamePlayerdata = GameToDTO(selectedGP.get().getGameEntry());
        gamePlayerdata.put("ships", selectedGP.get().getShips());
        gamePlayerdata.put("salvoes", getSalvoesforAll(gamePlayers));

        return gamePlayerdata;

    }

}
