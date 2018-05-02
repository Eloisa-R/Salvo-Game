package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import javax.servlet.http.HttpServletResponse;

import java.util.Collection;
import java.util.HashMap;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/rest")
public class PlayerController {

    @Autowired
    private PlayerRepository repository;


    public PlayerController() {

    }

    @GetMapping("/players")
    public Collection<Player> allPlayers() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }


    @RequestMapping(
            value = "/players",
            method = RequestMethod.POST)
    public void process(@RequestBody HashMap<String, String> player)
    {
        repository.save(new Player(player.get("firstName"), player.get("lastName"), player.get("userName")));

    }



}
