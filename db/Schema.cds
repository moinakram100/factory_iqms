using {managed} from '@sap/cds/common';

namespace db;

entity SecurityStatus : managed {
    key MsgNo       : Integer;
        MessageText : String;
}

entity AddParkingGate : managed {
    key Gate_no     : String;
        Description : String;
}

entity AddParkingArea : managed {
    key Area_no     : String;
        Description : String;
}

entity VehicleTypeDefinition : managed {
    key VehicleType       : String;
        VehicleDefinition : String;
}

entity MaterialTypeDefinition : managed {

    key Material           : String;
        MaterialDefinition : String;
        Division           : String;
        MaterialType       : String;
}

entity ChecklistCreation : managed {
    key VehicleType : String;
    key Remarks     : String;
        pass        : Boolean;
        fail        : Boolean;
}

entity ChecklistVerification : managed {
    key ParkingNo : String;
    key Remarks   : String;
        pass      : Boolean;
        fail      : Boolean;
}


entity BayAllocation : managed {
    key Id         : UUID;
        GantryName : String;
        BayLabel   : String;
        BayId      : String;
        Material   : String;
        Status     : String;
}

entity Bay {
    key Id           : UUID;
        text         : String;
        Calendertype : CalendarDayType;
}

type CalendarDayType : String enum {
    Type01;
    Type05;
    Type08;
    Type09;
    Type03;
}

entity Calender {
    key ID           : UUID;
        title        : String;
        text         : String;
        Matetial     : String;
        Calendertype : CalendarDayType;
        Quantity     : String;
        startDate    : String;
        endDate      : String;
}

