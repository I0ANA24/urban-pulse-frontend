namespace UrbanPulse.Core.Entities;

public class EventVerification
{
    public int Id { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; } = null!;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public bool Vote { get; set; } 
}