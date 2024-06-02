﻿using Azure.Core;
using Core.Services.Interfaces;
using DTOs;
using DTOs.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(Roles = "Professional")]
[Route("api/professionals/{professionalId}/clients")]
[ApiController]
public class ProfessionalClientController : ControllerBase
{
    private readonly IClientService _clientService;
    //private readonly IAuthenticationService _authenticationService;

    public ProfessionalClientController(IClientService clientService)
    {
        _clientService = clientService;
    }

    [HttpPost]
    public async Task<ActionResult<ClientCreatedDto>> AddClient(Guid professionalId, ClientAddDto clientAddDto)
    {
        return Ok(await _clientService.AddClientAsync(professionalId, clientAddDto));
    }
    

}