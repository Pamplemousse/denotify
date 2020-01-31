with import <nixpkgs> { };

stdenv.mkDerivation rec {
  name = "denotify";

  buildInputs = [
    nodePackages.web-ext
  ];
}
