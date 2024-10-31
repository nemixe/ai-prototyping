{
  description = "DOT NIX NodeJS Builder";

  inputs = {nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";};

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [];
      systems = ["aarch64-darwin" "x86_64-darwin" "x86_64-linux" "aarch64-linux"];
      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        ...
      }: {
        packages = {
          nodejs16-darwin-arm64 = pkgs.stdenv.mkDerivation {
            name = "nodejs20.18.0-darwin-arm64";
            src = pkgs.fetchurl {
              url = "https://nodejs.org/dist/v22.18.0/node-v20.18.0-darwin-arm64.tar.gz";
              sha256 = "sha256-nqYHZoB808OjrWrUGfmJGNY0pg/o3qW5wHUH7Q8XbUw=";
            };
            installPhase = ''
              echo "installing nodejs"
              mkdir -p $out
              cp -r ./ $out/
            '';
          };

          nodejs16-darwin-x64 = pkgs.stdenv.mkDerivation {
            name = "nodejs20.18.0-darwin-x64";
            src = pkgs.fetchurl {
              url = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-darwin-x64.tar.gz";
              sha256 = "sha256-N+CajPI1LzQNEgTGFUBY2BNi/vTsSIsBl7LONrPwNno=";
            };
            installPhase = ''
              echo "installing nodejs"
              mkdir -p $out
              cp -r ./ $out/
            '';
          };

          nodejs16-linux-x64 = pkgs.stdenv.mkDerivation {
            name = "nodejs20.18.0-linux-x64";
            src = pkgs.fetchurl {
              url = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-linux-x64.tar.gz";
              sha256 = "sha256-WJt+frIvg1h5eiwUoL2GVFnQtERYuPBdJyEpTazH9zQ=";
            };
            installPhase = ''
              echo "installing nodejs"
              mkdir -p $out
              cp -r ./ $out/
            '';
          };

          nodejs16-linux-arm64 = pkgs.stdenv.mkDerivation {
            name = "nodejs20.18.0-linux-arm64";
            src = pkgs.fetchurl {
              url = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-linux-arm64.tar.gz";
              sha256 = "sha256-RuOFf1VSq9NtlUg4DXlbBDo87sJQTmn+GnVPp2AS2q8=";
            };
            installPhase = ''
              echo "installing nodejs"
              mkdir -p $out
              cp -r ./ $out/
            '';
          };
        };

        devShells.default = pkgs.mkShell {
          buildInputs = [
            (pkgs.writeScriptBin "helpme" ''
              __usage="
              👋 Welcome to Vite Admiral development environment. 🚀
              If you see this message, it means your are inside the Nix shell ❄️.

              NodeJS Version: v${self'.packages.nodejs16-linux-x64.version}
              PNPM Version: v${self'.packages.nodejs16-linux-x64.pkgs.pnpm.version}

              Command available:
                - start:            start project in production ( need to run build first  ) 🛹
                - build:            build project for production
                - dev:              start development server
                - helpme:           show this messages

              Repository:
                - https://gitlab.dot.co.id/playground/boilerplates/vite-admiral
              [Info]===============================================================>
              "
              echo "$__usage"
            '')

            (pkgs.writeScriptBin "dev" ''
              pnpm dev
            '')

            (pkgs.writeScriptBin "build" ''
              pnpm build
            '')

            (pkgs.writeScriptBin "start" ''
              pnpm preview
            '')
            (
              if system == "aarch64-linux"
              then self'.packages.nodejs16-linux-arm64
              else if system == "aarch64-darwin"
              then self'.packages.nodejs16-darwin-arm64
              else if system == "x86_64-linux"
              then self'.packages.nodejs16-linux-x64
              else if system == "x86_64-darwin"
              then self'.packages.nodejs16-darwin-x64
              else null
            )
            pkgs.gnused
            pkgs.docker
            pkgs.nodePackages.node-gyp-build
          ];
        };
      };
      flake = {};
    };
}
