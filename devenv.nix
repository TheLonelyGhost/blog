{ pkgs, nixpkgsUpstream, lib, config, inputs, ... }:

let
  pkgsUpstream = import nixpkgsUpstream {
    inherit (pkgs) system;
  };
in {
  # https://devenv.sh/basics/
  # env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = [
    pkgsUpstream.hugo
    # pkgs.hugo
    pkgs.lychee
  ];

  # https://devenv.sh/scripts/
  # scripts.hello.exec = "echo hello from $GREET";

  # enterShell = ''
  #   hello
  #   git --version
  # '';

  # https://devenv.sh/tests/
  # enterTest = ''
  #   echo "Running tests"
  #   git --version | grep "2.42.0"
  # '';

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/languages/
  # languages.nix.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.check-symlinks.enable = true;
  # pre-commit.hooks.check-yaml.enable = true;
  # pre-commit.hooks.hunspell.enable = true;
  # pre-commit.hooks.markdownlint.enable = true;
  # pre-commit.hooks.vale.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";

  # See full reference at https://devenv.sh/reference/options/
}
