module {
  // No migration needed as the actor's persistent data remains unchanged.
  type Actor = {};

  public func run(old : Actor) : Actor {
    old;
  };
};
