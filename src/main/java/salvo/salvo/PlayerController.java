package salvo.salvo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class PlayerController {

    private PlayerRepository repository;

    public PlayerController(PlayerRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/players")
    @CrossOrigin(origins = "http://localhost:3000")
    public Collection<Player> allPlayers() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }

}
