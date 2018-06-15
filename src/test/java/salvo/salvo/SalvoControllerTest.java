package salvo.salvo;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(SalvoController.class)
public class SalvoControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    SalvoController salvoController;

    @MockBean
    PlayerRepository playerRepository;

    @MockBean
    GameRepository gameRepository;

    @MockBean
    GamePlayerRepository gamePlayerRepository;

    @MockBean
    ShipRepository shipRepository;

    @MockBean
    SalvoRepository salvoRepository;

    @MockBean
    ScoreRepository scoreRepository;

    @Before
    public void setUp() throws  Exception{
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }


    @Test
    public void createNewPlayerTest() throws  Exception{
        String inputUser = "paco@test.com";
        String inputFN = "Paco";
        String inputLN = "Test";
        String inputPwd = "54231";
        String body ="username=" + inputUser + "&firstname=" + inputFN + "&lastname=" + inputLN +"&password=" + inputPwd;
        mockMvc.perform(
                post("/api/players")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(content().string("Player created successfully"));


    }

}