import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type OldPremiumStatus = {
    status : { #pending; #approved; #rejected };
    premiumCode : ?Text;
    applied : Bool;
    displayName : ?Text;
    identityCode : Text;
    appliedAt : Int;
  };

  type NewPremiumStatus = {
    status : { #pending; #approved; #rejected };
    premiumCode : ?Text;
    applied : Bool;
    displayName : ?Text;
    identityCode : Text;
    appliedAt : Int;
    monthlyExpiry : ?Int;
  };

  type OldActor = {
    premiumStatus : Map.Map<Principal, OldPremiumStatus>;
  };

  type NewActor = {
    premiumStatus : Map.Map<Principal, NewPremiumStatus>;
    monthlySubscriptions : Map.Map<Principal, Int>;
  };

  public func run(old : OldActor) : NewActor {
    let newPremiumStatus = old.premiumStatus.map<Principal, OldPremiumStatus, NewPremiumStatus>(
      func(_p, oldPrem) {
        { oldPrem with monthlyExpiry = null };
      }
    );
    {
      premiumStatus = newPremiumStatus;
      monthlySubscriptions = Map.empty<Principal, Int>();
    };
  };
};
