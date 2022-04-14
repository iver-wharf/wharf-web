#!/usr/bin/env pwsh

param (
	[string] $DockerNetwork = "host",
	[string] $DockerImage = "swaggerapi/swagger-codegen-cli:2.4.26",
	[string] $DockerExec = "docker",
	[switch] $SkipBuilding
)

$loc = $PSScriptRoot

function Sync-Project {
	param (
		$ProjectName,
		$SwaggerDocPath
	)

	&$DockerExec run --rm --tty `
		--volume ${loc}:/local `
		--network $DockerNetwork `
		$DockerImage `
		generate `
			--input-spec $SwaggerDocPath `
			--lang typescript-angular `
			--output /local/projects/$ProjectName/src `
			--additional-properties ngVersion=13.3.2

	if (-not $?) {
		throw "Failed to pull Swagger definitions for '$ProjectName'"
	}

	if ($SkipBuilding) {
		Write-Host "Skipping 'npx ng build $ProjectName' as `$SkipBuilding was enabled"
	} else {
		npx ng build $ProjectName

		if (-not $?) {
			throw "Failed to build project '$ProjectName'"
		}
	}
}

Sync-Project -ProjectName api-client -SwaggerDocPath https://github.com/iver-wharf/wharf-api/releases/download/v5.1.2/swagger.json
Sync-Project -ProjectName import-azuredevops-client -SwaggerDocPath https://github.com/iver-wharf/wharf-provider-azuredevops/releases/download/v2.0.1/swagger.json
Sync-Project -ProjectName import-github-client -SwaggerDocPath https://github.com/iver-wharf/wharf-provider-github/releases/download/v3.0.0/swagger.json
Sync-Project -ProjectName import-gitlab-client -SwaggerDocPath https://github.com/iver-wharf/wharf-provider-gitlab/releases/download/v1.3.0/swagger.json
