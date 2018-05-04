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
        gamePlayerInfo.put("player", playerToDTO(gamePlayer.getGamePlayer()));
        return gamePlayerInfo;
    }

    private List<Map> getGamePlayers(Game game){
        Set<GamePlayer> gamePlayers = game.getGameplays();
        return gamePlayers.stream()
                .map(gp -> gamePlayerToDTO(gp))
                .collect(toList());
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
        return GameToDTO(selectedGP.get().getGameEntry());

    }

}
