﻿using DTOs;
using DTOs.Professional;

namespace Core.Services.Interfaces
{
    public interface IProfessionalService
    {
        Task<ServiceResponse<List<ProfessionalGetDto>>> AddProfessional(ProfessionalAddDto addProfessional);
        Task<ServiceResponse<List<ProfessionalGetDto>>> DeleteProfessional(Guid professionalId);
        Task<ServiceResponse<List<ProfessionalWithSlotsDto>>> GetAllProfessionalsWithSlots();
        Task<ServiceResponse<ProfessionalGetDto>> GetProfessionalById(Guid id);
    }
}
