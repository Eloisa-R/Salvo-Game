package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api")
public class SalvoController {

    @Autowired
    private GameRepository gameRepository;

    public SalvoController() {}

    @RequestMapping("/data")
    public List<Object> getGameIds(){
       return this.gameRepository.findAll().stream()
                .map(game -> game.getId())
                .collect(toList());
    }


}
